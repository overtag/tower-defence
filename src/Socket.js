import {eventEmitter, EVENTS} from './events/EventEmitter';

export class Socket {
  constructor() {
    this.hash = '';
    this.exitUrl = '';
    this.endUrl = '';
    this.complexity = '';
    
    this.connect();

    eventEmitter.on(EVENTS.SET_COMPLEXITY, this.start, this); 
    //eventEmitter.on(EVENTS.GAME_VICTORY, this.end, this); 
    //eventEmitter.on(EVENTS.GAME_OVER, this.end, this); 
  }

  connect() {
    this.socket = new WebSocket(`${window.websocket_host}&user_id=${window.user_id}`);
    this.socket.addEventListener('open', () => {
      this.easy();
    });
    
    this.socket.addEventListener('close', function(event) {
      if (event.wasClean) {
        // console.log('Соединение закрыто чисто');
      } else if (event.code === 3) { 
        alert('Обрыв соединения'); 
        connect();
      }
    });
    
    this.socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      this.callback(data);
    })
  }

  callback() {

  }
  
  easy() {
    const data = JSON.stringify({	
      action: 'easy',
      name: 'deputy'
    });
    this.socket.send(data);

    this.callback = function(data) {
      //console.log('SOKET_CONNECT');
      eventEmitter.emit(EVENTS.SOKET_CONNECT, data);
    }
  }

  start(evt) {
    const data = {	
      action: 'start',
      name: 'deputy',
      complexity: evt.complexity
    };
    this.socket.send(JSON.stringify(data)); 
    this.complexity = evt.complexity;
    
    this.callback = (data) => {
      this.hash = data.hash;
      this.exitUrl = data.exitUrl;
      eventEmitter.emit(EVENTS.EXIT_URL, data);
    }
  }

  end(evt) {
    const data = {	
      action: 'end',
      name: 'deputy',
      complexity: this.complexity, 
      result: evt.result, 
      hash : this.hash 
    }
    this.socket.send(JSON.stringify(data)); 
    this.callback = (data) => {
      this.endUrl = data.endUrl;
    }
  }
}   