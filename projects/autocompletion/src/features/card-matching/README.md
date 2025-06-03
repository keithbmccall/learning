# Card Matching Game Component - Technical Documentation

## Overview
The Card Matching Game component is a React-based implementation of a memory card game. Players flip cards to find matching pairs, with the game tracking matches and handling the game state. The component is built with flexibility to support different matching rules (pairs, triplets, etc.) and uses modern React patterns for state management.

## Data Storage

### State Management
The component uses React's useState hook to manage several pieces of state:

1. **cards**: An array of card objects, each containing:
   - **card**: The emoji or content to display when flipped
   - **isMatched**: Boolean flag indicating if the card has been successfully matched

2. **cardsMap**: A record that maps card indices to their flipped state (boolean)
   ```typescript
   const [cardsMap, setCardsMap] = useState<Record<number, boolean>>({});
   ```

3. **faceUpCards**: An array of indices representing currently flipped cards that haven't been matched yet
   ```typescript
   const [faceUpCards, setFaceUpCards] = useState<number[]>([]);
   ```

### Data Structure
The component uses a flat array structure for cards, with indices serving as unique identifiers. This approach simplifies the implementation while maintaining O(1) access time for individual cards. The relationship between cards is maintained implicitly through their content rather than through explicit references.

## Data Access Algorithms

### Card Shuffling
The component implements the Fisher-Yates shuffle algorithm to randomize card positions:
```typescript
for (let i = shuffledCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffledCards[i];
    shuffledCards[i] = shuffledCards[j];
    shuffledCards[j] = temp;
}
```

This algorithm provides an unbiased shuffle with O(n) time complexity, ensuring each possible permutation has an equal probability.

### Card Duplication
Before shuffling, the component duplicates each card type based on the `matchTarget` parameter:
```typescript
const shuffledCards = cards.flatMap((card) => {
    const blankCards: Array<{ card: string; isMatched: boolean }> = [];
    for (let i = 0; i < matchTarget; i++) {
        blankCards.push({ card, isMatched: false });
    }
    return blankCards;
});
```

This allows the game to support different matching rules (pairs, triplets, etc.) by changing a single parameter.

### Match Detection
The component uses the `every` array method to check if all flipped cards match:
```typescript
const hasMatch = faceUpCards.every((cardIndex) => {
    return cards[faceUpCards[0]].card === cards[cardIndex].card;
});
```

This approach has O(n) time complexity where n is the number of face-up cards (typically small).

### Card Flipping Logic
The component implements a controlled card flipping mechanism:
1. Cards can only be flipped if:
   - They are not already flipped
   - The maximum number of unmatched face-up cards hasn't been reached
2. When a card is flipped, its index is:
   - Added to the `faceUpCards` array
   - Marked as flipped in the `cardsMap` record

## Game Flow

1. **Initialization**: Cards are duplicated and shuffled when the component mounts or when `matchTarget` changes
2. **Card Selection**: User clicks on cards to flip them
3. **Match Checking**: When the number of face-up cards reaches `matchTarget`, the component checks for a match
4. **Match Handling**:
   - If matched: Cards are marked as matched and remain face up
   - If not matched: Cards are flipped back after a 1-second delay
5. **Game Completion**: Detected when all cards are matched, triggering a "You win!" alert

## Performance Considerations

1. **Efficient State Updates**: Uses functional updates to ensure state consistency
2. **Proper Cleanup**: Cancels pending timeouts when the component unmounts or when dependencies change
3. **Conditional Rendering**: Applies CSS classes conditionally rather than remounting components
4. **Memoization**: The `matchTarget` dependency in the shuffle effect ensures cards are only reshuffled when necessary

## Layout Implementation

The component uses CSS Flexbox for layout:
```css
.card-table {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    max-width: 400px;
    margin: 0 auto;
}
```

Card widths are calculated to maintain consistent spacing:
```css
width: calc(25% - 13.5px);
```

This calculation ensures that four cards fit per row with proper gap spacing between them.

## Data Flow Diagram
```
Initialization → Card Selection → Match Checking → Match Handling → (Repeat until all matched)
```

This implementation balances simplicity with flexibility, providing an engaging user experience while maintaining clean code structure and performance.

## API Guide

### onFlipCard Function
The `onFlipCard` function handles the card flipping logic when a user clicks on a card:

```typescript
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
```

Line-by-line explanation:
1. `const { isFlipped, index } = e.currentTarget.dataset;` - Extracts the `isFlipped` and `index` values from the clicked card's data attributes.
2. `const cardIndex = parseInt(index || "");` - Converts the string index to a number, with a fallback to an empty string if index is undefined.
3. `const isNumber = Number.isInteger(cardIndex);` - Validates that the parsed index is a valid integer.
4. `if (!isAllDisabled && isFlipped !== "true" && isNumber) {` - Checks three conditions before proceeding:
   - `!isAllDisabled`: Ensures that the maximum number of cards aren't already flipped
   - `isFlipped !== "true"`: Ensures the card isn't already flipped
   - `isNumber`: Ensures the card index is valid
5. `setCardsMap({ ...cardsMap, [cardIndex]: true });` - Updates the cardsMap state to mark this card as flipped.
6. `setFaceUpCards([...faceUpCards, cardIndex]);` - Adds this card's index to the faceUpCards array.

### First useEffect (Card Initialization)
This useEffect handles the initialization and shuffling of cards:

```typescript
useEffect(() => {
    const shuffleCards = (cards: string[]) => {
        // Shuffle the array using the Fisher-Yates algorithm
        const shuffledCards = cards.flatMap((card) => {
            const blankCards: Array<{ card: string; isMatched: boolean }> = [];
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
```

Line-by-line explanation:
1. `const shuffleCards = (cards: string[]) => {` - Defines a function that takes an array of card types and returns shuffled card objects.
2. `const shuffledCards = cards.flatMap((card) => {` - Uses flatMap to transform each card type into multiple card objects.
3. `const blankCards: Array<{ card: string; isMatched: boolean }> = [];` - Creates an empty array to hold the duplicated cards.
4. `for (let i = 0; i < matchTarget; i++) {` - Loops based on the matchTarget value (how many matching cards are needed).
5. `blankCards.push({ card, isMatched: false });` - Creates a new card object for each duplicate.
6. `return blankCards;` - Returns the array of duplicated cards for this card type.
7. `});` - Completes the flatMap operation, resulting in an array with all card types duplicated.
8-13. Implements the Fisher-Yates shuffle algorithm to randomize the card order.
14. `return shuffledCards;` - Returns the final shuffled array of card objects.
15. `setCards(shuffleCards(cardTypes));` - Updates the cards state with the shuffled cards.
16. `}, [matchTarget]);` - Specifies that this effect should run when the component mounts and whenever matchTarget changes.

### Second useEffect (Match Checking)
This useEffect handles checking for matches when cards are flipped:

```typescript
useEffect(() => {
    const faceUpCount = faceUpCards.length;
    if (faceUpCount >= matchTarget) {
        const hasMatch = faceUpCards.every((cardIndex) => {
            return cards[faceUpCards[0]].card === cards[cardIndex].card;
        });
        if (hasMatch) {
            setCards(
                cards.map((card, index) => {
                    if (cardsMap[index]) {
                        return { ...card, isMatched: true };
                    }
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
```

Line-by-line explanation:
1. `const faceUpCount = faceUpCards.length;` - Gets the number of currently face-up cards.
2. `if (faceUpCount >= matchTarget) {` - Checks if enough cards are flipped to potentially form a match.
3. `const hasMatch = faceUpCards.every((cardIndex) => {` - Uses the array.every method to check if all flipped cards match.
4. `return cards[faceUpCards[0]].card === cards[cardIndex].card;` - Compares each card's value with the first flipped card.
5. `});` - Completes the every check, resulting in true if all cards match.
6. `if (hasMatch) {` - Executes the matching logic if all cards match.
7-13. Updates the cards state to mark the matched cards as permanently matched.
14. `setCardsMap({});` - Clears the temporary flipped state.
15. `setFaceUpCards([]);` - Clears the face-up cards array.
16. `} else {` - Executes if the cards don't match.
17-19. Sets a timeout to flip the cards back after 1 second.
20. `return () => clearTimeout(timeout);` - Cleanup function to prevent memory leaks if the component unmounts during the timeout.
21. `}` - Closes the else block.
22. `}` - Closes the if block.
23. `}, [faceUpCards, cardsMap, cards, matchTarget]);` - Specifies that this effect should run whenever any of these dependencies change.

### Third useEffect (Game Completion Detection)
This useEffect handles detecting when the game is completed and showing a win message:

```typescript
useEffect(() => {
  if (cards.length && cards.every((card) => card.isMatched)) {
    alert('You win!');
  }
}, [cards]);
```

Line-by-line explanation:
1. `if (cards.length && cards.every((card) => card.isMatched)) {` - Checks two conditions:
   - `cards.length`: Ensures the cards array is not empty
   - `cards.every((card) => card.isMatched)`: Checks if every card has been matched
2. `alert('You win!');` - Shows an alert dialog with a win message when all cards are matched
3. `}, [cards]);` - Specifies that this effect should run whenever the cards state changes
