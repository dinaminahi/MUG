const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/MUG-DB');

const gameSchema = {
    id: Number,
    name: String,
    category: [],
    description: String,
    playersMinAge: Number,
    playersCount: { min: Number, max: Number},
    playTimeMinutes: { min: Number, max: Number},
    instructionUrl: String,
    photoUrl: String
}
    
const Game = mongoose.model('Game', eventSchema);

const game = new Game({
  id: 1,
  name: 'Ticket to Ride Junior: Європа',
  category: ['Стратегії', 'Сімейні', 'Новачкам'],
  description: 'Варіант відомої гри «Квиток на поїзд. Європа», створений спеціально для дітей у віці від 6 років. Завдяки цій грі діти зможуть познайомитися з головними визначними пам\'ятками Європи, такими як Ейфелева вежа в Парижі і Біг-Бен в Лондоні, Колізей в Римі та Саграда-Фамілія в Барселоні. Діти будуть прокладати залізничні гілки від Мадрида до Москви і від Дубліна до Анкари, відвідуючи, звичайно ж, і нашу улюблену столицю Київ.',
  playersMinAge: 6,
  playersCount: { min: 2, max: 4},
  playTimeMinutes: { min:15, max: 30},
  instructionUrl: 'https://geekach.com.ua/content/files/pravila-nastolnoy-igry-bilet-na-poezd-junior-evropa-na-russkom-jazyke_65354990.pdf',
  photoUrl: 'https://geekach.com.ua/content/images/24/bilet-na-poezd-junior-evropa-ticket-to-ride-junior-europe-18967549422113.png',
  });

  
  game.save(function(err) {
    if (!err) {
      console.log('Success');
    }
  });

module.exports = router;
