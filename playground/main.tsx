// REACT-UI/playground/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
// import { Label } from '../src'; // importa do index.ts da lib
import Label from '../src/components/Label';


const App = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <Label label="Nome" labelPosition="top">
                <input type="text" />
            </Label>
        </div>
    );
};

const root = document.getElementById('root')!;
ReactDOM.createRoot(root).render(<App />);
