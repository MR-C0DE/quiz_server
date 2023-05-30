const questions = [
    {
        id:0,
        text: 'Au Moyen Âge, tout le monde était sale et mourait jeune',
        img: 'moyen_age',
        answers : false
    },
    {
        id:1,
        text: 'Napoléon était petit.',
        img: 'napoleon',
        answers : false
    },
    {
        id:2,
        text: 'La peste a décimé l’Europe.',
        img: 'peste',
        answers : true
    },
    {
        id:3,
        text: 'L’homme de Néandertal était une brute épaisse',
        img: 'homme',
        answers : false
    },
    {
        id:4,
        text: 'Les coureurs des bois étaient mal vus au temps de la Nouvelle-France',
        img: 'coureurs',
        answers : true
    }
];

export function getQuestion(){
    return questions;
}

