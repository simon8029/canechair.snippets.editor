import * as React from 'react';
export interface Props {
    languageName: string;
    enthusiasmLevel?: number;
    incrementEnthusiasm?: () => {};
    decrementEnthusiasm?: () => {};
}

function Hello({ languageName = 'asd', enthusiasmLevel = 1, incrementEnthusiasm, decrementEnthusiasm }: Props) {
    if (enthusiasmLevel <= 0) {
        throw new Error('You could be a little more enthusiastic. :D');
    }

    return (
        <div className="hello">
            <div className="greeting">
                {languageName + getExclamationMarks(enthusiasmLevel)}
            </div>
            <div>
                <button onClick={decrementEnthusiasm}>-</button>
                <button onClick={incrementEnthusiasm}>+</button>
            </div>
        </div>
    );
}

export default Hello;

// helpers

function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!');
}