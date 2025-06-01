import React, { useState, useEffect } from "react";
import "./card-matching.css";

const cardTypes = ["🐶", "🦊", "🐱", "🐭", "🐻", "🐼", "🐷", "🦁"];

const shuffleCards = (cards: string[]) => {
    // Shuffle the array using the Fisher-Yates algorithm
    const shuffledCards = cards.flatMap((card) => [
        { card, isMatched: false },
        { card, isMatched: false },
    ]);

    for (let i = shuffledCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledCards[i], shuffledCards[j]] = [
            shuffledCards[j],
            shuffledCards[i],
        ];
    }

    return shuffledCards;
};

const _cards = shuffleCards(cardTypes);

export const CardMatching = () => {
    const [cardsMap, setCardsMap] = useState<Record<string, boolean>>({});
    const [cards, setCards] = useState(_cards);
    const [disabled, setDisabled] = useState(false);

    const flipCard = (cardIndex: number) => {
        setCardsMap({
            ...cardsMap,
            [cardIndex]: true,
        });
    };
    useEffect(() => {
        setDisabled(true);
        const faceUpCards: number[] = [];
        const faceUpCount = Object.keys(cardsMap).reduce((count, cardIndex) => {
            const bool = cardsMap[cardIndex];
            if (bool) {
                faceUpCards.push(cardIndex);
                return count + 1;
            }
            return count;
        }, 0);

        if (faceUpCount >= 2) {
            const matches = faceUpCards.every((cardIndex) => {
                return cards[faceUpCards[0]].card === cards[cardIndex].card;
            });
            if (matches) {
                setCards(
                    cards.map((card, index) => {
                        if (cardsMap[index])
                            return { ...card, isMatched: true };
                        return card;
                    }),
                );
                setCardsMap({});
            } else {
                setTimeout(() => {
                    setCardsMap({});
                }, 1000);
            }
        }
        setDisabled(false);
    }, [cardsMap]);

    return (
        <div>
            <h2>Card Matching Game</h2>
            <div className="card-table">
                {cards.map(({ card, isMatched }, index) => {
                    const isFlipped = isMatched || cardsMap[index];
                    return (
                        <div
                            key={index}
                            className={`card ${
                                isFlipped ? "card-flipped" : ""
                            }`}
                            onClick={() => {
                                if (!isFlipped || !disabled) flipCard(index);
                            }}
                        >
                            {isFlipped ? card : "A"}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
