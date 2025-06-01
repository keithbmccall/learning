import { useState, useEffect, type MouseEvent } from "react";
import "./card-matching.css";

const cardTypes = ["🐶", "🦊", "🐱", "🐭", "🐻", "🐼", "🐷", "🦁"];

export const CardMatching = ({ matchTarget = 2 }: { matchTarget?: number }) => {
    const [cardsMap, setCardsMap] = useState<Record<number, boolean>>({});
    const [faceUpCards, setFaceUpCards] = useState<number[]>([]);
    const [cards, setCards] = useState<
        Array<{ card: string; isMatched: boolean }>
    >([]);

    useEffect(() => {
        const shuffleCards = (cards: string[]) => {
            // Shuffle the array using the Fisher-Yates algorithm
            const shuffledCards = cards.flatMap((card) => {
                const blankCards: Array<{ card: string; isMatched: boolean }> =
                    [];
                for (let i = 0; i < matchTarget; i++) {
                    blankCards.push({ card, isMatched: false });
                }
                return blankCards;
            });

            for (let i = shuffledCards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledCards[i], shuffledCards[j]] = [
                    shuffledCards[j],
                    shuffledCards[i],
                ];
            }

            return shuffledCards;
        };
        setCards(shuffleCards(cardTypes));
    }, [matchTarget]);

    useEffect(() => {
        const faceUpCount = faceUpCards.length;
        if (faceUpCount >= matchTarget) {
            const hasMatch = faceUpCards.every((cardIndex) => {
                return cards[faceUpCards[0]].card === cards[cardIndex].card;
            });
            if (hasMatch) {
                setCards(
                    cards.map((card, index) => {
                        if (cardsMap[index])
                            return { ...card, isMatched: true };
                        return card;
                    }),
                );
                setCardsMap({});
                setFaceUpCards([]);
            } else {
                const timeout = setTimeout(() => {
                    setCardsMap({});
                    setFaceUpCards([]);
                }, 1000);
                return () => clearTimeout(timeout);
            }
        }
    }, [faceUpCards, cardsMap, cards, matchTarget]);

    const isAllDisabled = faceUpCards.length >= matchTarget;

    const onFlipCard = (e: MouseEvent<HTMLDivElement>) => {
        const { isFlipped, index } = e.currentTarget.dataset;
        const cardIndex = parseInt(index || "");
        const isNumber = Number.isInteger(cardIndex);
        if (!isAllDisabled && isFlipped !== "true" && isNumber) {
            setCardsMap({
                ...cardsMap,
                [cardIndex]: true,
            });
            setFaceUpCards([...faceUpCards, cardIndex]);
        }
    };

    return (
        <div>
            <h2>Card Matching Game</h2>
            <div className="card-table">
                {cards.map(({ card, isMatched }, index) => {
                    const isFlipped = isMatched || cardsMap[index] || false;
                    return (
                        <div
                            key={index}
                            data-index={index.toString()}
                            data-isFlipped={isFlipped.toString()}
                            className={`card ${
                                isFlipped ? "card-flipped" : ""
                            }`}
                            onClick={onFlipCard}
                        >
                            {isFlipped ? card : "A"}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
