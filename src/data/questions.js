// The "Cute Questions" flow.
// Each question has two options. `shyOnNo` makes the "No" button playfully
// dodge/shake before it accepts (used for Q4). `isFinal` triggers the grand
// celebration finale.

export const questions = [
  {
    id: 1,
    text: 'Are you smiling right now? 😊',
    options: [
      { label: 'Yes ❤️', response: 'I knew it! That smile is basically my favourite thing in the world.' },
      { label: 'No 🙈', response: 'Well… now you are. Caught you! 😄' },
    ],
  },
  {
    id: 2,
    text: "Do you know you're incredibly beautiful?",
    options: [
      { label: 'Yes ✨', response: 'Confidence looks stunning on you. Never lose it.' },
      { label: 'No 😤', response: 'Then let me be the one to remind you — inside and out. 🌷' },
    ],
  },
  {
    id: 3,
    text: "Do you know you're one of the hardest-working people I've ever met?",
    options: [
      { label: 'Yes 💪', response: 'That dedication of yours is quietly extraordinary.' },
      { label: 'No 🌸', response: 'You are. I have watched you give everything your all — it does not go unnoticed.' },
    ],
  },
  {
    id: 4,
    text: 'Can I always make you smile?',
    shyOnNo: true,
    options: [
      { label: 'Yes ❤️', response: 'Challenge happily accepted. Every single day.' },
      { label: 'No 🤭', response: 'Nice try — that button clearly wanted a "yes" too. 😉' },
    ],
  },
  {
    id: 5,
    text: 'Will you let me be there whenever you need someone?',
    options: [
      { label: 'Yes 💖', response: 'Then I am not going anywhere. Rain or shine.' },
      { label: 'No 🥺', response: 'That is okay… I will still be quietly cheering for you anyway.' },
    ],
  },
  {
    id: 6,
    text: 'Do you think destiny brought us together?',
    options: [
      { label: 'Yes ✨', response: 'Some things feel too perfectly timed to be coincidence.' },
      { label: 'Maybe 🌙', response: 'A "maybe" from you already feels like a little bit of magic.' },
    ],
  },
  {
    id: 7,
    text: 'Have you ever thought about us?',
    options: [
      { label: 'Yes ❤️', response: 'You just made my heart do a very undignified little skip.' },
      { label: 'Maybe 🤍', response: 'I will happily hold onto that "maybe" like a treasure.' },
    ],
  },
  {
    id: 8,
    text: 'If I asked you to go for coffee someday… would you say?',
    options: [
      { label: 'Yes ☕❤️', response: "It's a date. I already know exactly where I'd take you." },
      { label: 'Maybe ☺️', response: 'I will take that "maybe" and make it the best coffee of your life.' },
    ],
  },
  {
    id: 9,
    text: 'Do you think I care about you?',
    options: [
      { label: 'Yes 💕', response: 'More than my words could ever properly say.' },
      { label: 'Of Course 😄', response: 'Exactly. Never doubt it for a second.' },
    ],
  },
  {
    id: 10,
    text: 'Final Question… Can I continue liking you a little more every single day?',
    isFinal: true,
    options: [
      { label: 'Yes ❤️', response: '' },
      { label: 'Absolutely ❤️✨', response: '' },
    ],
  },
];
