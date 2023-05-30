// Importando o módulo 'express' e atribuindo-o à constante 'app'
const app = require('express')();
// Importando o módulo 'http' e criando um servidor com ele, atribuindo-o à constante 'http'
const http = require('http').createServer(app);
// Importando o módulo 'socket.io' e passando o servidor 'http' como parâmetro, atribuindo-o à constante 'io'
const io = require('socket.io')(http);

// Importando o módulo express
const express = require('express');

//Configurando o middleware para servir arquivos estáticos é funções que são executadas em cada requisição feita ao servidor
app.use(express.static('public'));

// Definindo a rota principal
// Enviando o arquivo index.html
// Rota para a página inicial
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

// Evento para quando o cliente se conecta ao servidor via Socket.io
io.on('connection', (socket) => {
  console.log('Usuário conectado');

  // Evento para quando o cliente envia uma mensagem via Socket.io
  socket.on('chat message', (data) => io.emit('chat message', data));

  // Evento para quando o cliente se desconecta do servidor via Socket.io
  socket.on('disconnect', () => console.log('Usuário desconectado'));
});

// Inicia o servidor na porta 3000
http.listen(3000, () => {
  console.log(`Servidor rodando na porta 3000 - Link http://localhost:3000`);
});
