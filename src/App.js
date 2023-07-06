import React, { useState, useEffect } from "react";
 import "./Calculator.css";


function Calculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const nonNumberOperands = ["+", "-", "*", "/", "%"];

  useEffect(() => {
    async function calculateExpression() {
      try {
        const evaluatedResult = await evaluate(expression);
        setResult(evaluatedResult.toString());
      } catch (error) {
        setResult("");
      }
    }
    calculateExpression();
  }, [expression]);

  const backspace = () => {
    setExpression((prevExpression) => {
      const val = prevExpression.substring(0, prevExpression.length - 1);
      return prevExpression === "" ? "" : val;
    });
  };

  const evaluate = (expression) => {
    // Remove all whitespace from the expression
    expression = expression.replace(/\s/g, "");
    const powerOperand = expression.charAt(expression.length - 2);
    if (powerOperand === "^") {
      return eval(
        Math.pow(
          eval(expression.substring(0, expression.length - 2)),
          expression[expression.length - 1]
        )
      );
    }
    // evaluate the expression
    return eval(expression);
  };

  const appendToExpression = (value) => {
    setExpression((prevExpression) => {
      const prevOperand = prevExpression.charAt(prevExpression.length - 1);
      //prevent duplicate operands
      if (
        nonNumberOperands.includes(prevOperand) &&
        nonNumberOperands.includes(value)
      ) {
        return prevExpression;
      } else {
        return prevExpression + value;
      }
    });
  };

  const resetCalculator = () => {
    setExpression("");
    setResult("");
  };

  return (
    <div className="calculator">
      <input
        type="text"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        placeholder="0"
      />
      <input type="text" value={result} disabled />
      <div className="calculator-buttons">
        <button onClick={() => appendToExpression("%")}>%</button>
        <button onClick={() => appendToExpression("^")}>^</button>

        <button onClick={resetCalculator}>clr</button>
        <button className="color-button" onClick={() => backspace()}>
          &larr;
        </button>
        <button onClick={() => appendToExpression("1")}>1</button>
        <button onClick={() => appendToExpression("2")}>2</button>
        <button onClick={() => appendToExpression("3")}>3</button>
        <button
          className="color-button"
          onClick={() => appendToExpression("+")}
        >
          +
        </button>
        <button onClick={() => appendToExpression("4")}>4</button>
        <button onClick={() => appendToExpression("5")}>5</button>
        <button onClick={() => appendToExpression("6")}>6</button>
        <button
          className="color-button"
          onClick={() => appendToExpression("-")}
        >
          -
        </button>
        <button onClick={() => appendToExpression("7")}>7</button>
        <button onClick={() => appendToExpression("8")}>8</button>
        <button onClick={() => appendToExpression("9")}>9</button>
        <button
          className="color-button"
          onClick={() => appendToExpression("*")}
        >
          *
        </button>
        <button onClick={() => appendToExpression("0")}>0</button>
        <button onClick={() => appendToExpression("(")}>(</button>
        <button onClick={() => appendToExpression(")")}>)</button>
        <button
          className="color-button"
          onClick={() => appendToExpression("/")}
        >
          /
        </button>

      </div>
    </div>
  );
}

export default Calculator;

