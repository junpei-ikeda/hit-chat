import React, { useState, useEffect, useRef } from 'react'; // Reactの必要なフックをインポート
import webSockets from '../styles/webSockets'; // スタイルをインポート

// WebSocketチャットコンポーネント
const WebSocketChat = () => {
  const [messages, setMessages] = useState([]); // メッセージを格納するステート
  const [message, setMessage] = useState(''); // 入力中のメッセージを保持するステート
  const [error, setError] = useState(null); // エラーメッセージを格納するステート
  const socketRef = useRef(null); // WebSocketインスタンスを保持するref
  const chatBoxRef = useRef(null); // チャットボックスのスクロールを制御するref
  const reconnectInterval = useRef(null); // 再接続のためのタイマーを保持するref
  const reconnectAttempts = useRef(0); // 再接続試行回数をカウントするref
  const isComposing = useRef(false); // 入力中のフラグ（IMEの状態を管理）

  // WebSocket接続関数
  const connectWebSocket = () => {
    // すでにWebSocket接続があれば閉じる
    if (socketRef.current) {
      socketRef.current.close();
    }

    // 新しいWebSocket接続を作成
    socketRef.current = new WebSocket('ws://localhost/ws/');

    // 接続が開いたときの処理
    socketRef.current.onopen = () => {
      console.log('WebSocket接続が確立しました');
      setError(null); // エラーステートをクリア
      reconnectAttempts.current = 0; // 再接続試行回数をリセット
    };

    // メッセージを受信したときの処理
    socketRef.current.onmessage = (event) => {
      const handleMessage = (text, isOwn = false) => {
        // 受信したメッセージをステートに追加
        setMessages((prevMessages) => [...prevMessages, { text, isOwn }]);
        setTimeout(() => {
          // 新しいメッセージを表示するためにチャットボックスをスクロール
          chatBoxRef.current?.scrollTo({ top: chatBoxRef.current.scrollHeight, behavior: 'smooth' });
        }, 100);
      };

      // 受信したデータがBlob（ファイル）であればテキストとして読み込む
      if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => handleMessage(reader.result);
        reader.readAsText(event.data);
      } else {
        // 通常のテキストメッセージとして処理
        handleMessage(event.data);
      }
    };

    // エラー発生時の処理
    socketRef.current.onerror = (error) => {
      console.error('WebSocketエラー:', error);
      setError('WebSocket接続中にエラーが発生しました'); // エラーステートを設定
      reconnectWebSocket(); // 再接続を試みる
    };

    // WebSocketが閉じられたときの処理
    socketRef.current.onclose = (event) => {
      console.warn(`WebSocket切断 (code: ${event.code}, reason: ${event.reason})`);
      reconnectWebSocket(); // 再接続を試みる
    };
  };

  // WebSocketの再接続処理
  const reconnectWebSocket = () => {
    // 5回の再接続試行後、エラーメッセージを表示して終了
    if (reconnectAttempts.current >= 5) {
      console.error('WebSocketの再接続に5回失敗しました');
      setError('サーバーへの接続が不安定です');
      return;
    }

    // 再接続の遅延を計算（指数バックオフ）
    const delay = Math.min(5000, 1000 * 2 ** reconnectAttempts.current);
    reconnectAttempts.current += 1; // 再接続試行回数を増加
    console.log(`WebSocket再接続を試行 (count: ${reconnectAttempts.current}, next: ${delay}ms)`);

    // 再接続を試みる
    clearTimeout(reconnectInterval.current); // 以前のタイマーをクリア
    reconnectInterval.current = setTimeout(() => {
      connectWebSocket(); // 再接続を実行
    }, delay);
  };

  // コンポーネントがマウントされた時にWebSocket接続を開始
  useEffect(() => {
    connectWebSocket();

    // コンポーネントがアンマウントされたときにWebSocket接続を閉じる
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      clearTimeout(reconnectInterval.current);
    };
  }, []);

  // メッセージ送信処理
  const handleSendMessage = () => {
      if (!message.trim()) return;
      if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
          setError('現在WebSocketに接続されていません');
          return;
      }

      // サニタイズ: 送信前にメッセージ内容をサニタイズ
      const sanitizedMessage = message.replace(/<[^>]*>/g, '');
      socketRef.current.send(sanitizedMessage);

      // setMessages((prevMessages) => [...prevMessages, { text: sanitizedMessage, isOwn: true }]);
      setMessage('');
  };

  const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !isComposing.current) {
          e.preventDefault();
          handleSendMessage();
      }
  };

  return (
    <div style={webSockets.container}>
      <h1 style={webSockets.header}>WebSocket チャット</h1>
      {error && <div style={webSockets.error}>{error}</div>} {/* エラーメッセージがあれば表示 */}

      <div ref={chatBoxRef} style={webSockets.chatBox}>
        {/* 受信したメッセージを表示 */}
        {messages.map((msg, index) => (
          <div key={index} style={msg.isOwn ? webSockets.ownMessage : webSockets.otherMessage}>
            {msg.text}
          </div>
        ))}
      </div>

      <div style={webSockets.inputContainer}>
        {/* メッセージ入力欄 */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)} // 入力内容の変更を反映
          onKeyDown={handleKeyDown} // キー押下時に送信処理
          onCompositionStart={() => (isComposing.current = true)} // IME入力開始時
          onCompositionEnd={() => (isComposing.current = false)} // IME入力終了時
          placeholder="メッセージを入力..."
          style={webSockets.input}
        />
        {/* 送信ボタン */}
        <button onClick={handleSendMessage} style={webSockets.button}>送信</button>
      </div>
    </div>
  );
};

export default WebSocketChat;
