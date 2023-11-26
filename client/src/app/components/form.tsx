import { useRef, useState } from "react";
import { User, getUsers } from "../helpers/getUsers";
import { validateEmail, validateNumber, inputMask, formatNumber } from "../helpers/validators";

import styles from "../app.module.css"

export function Form() {
    const [result, setResult] = useState<User[] | string>("Введите запрос" as string);
    const myRefEmail = useRef<HTMLInputElement>(null);
    const myRefNumber = useRef<HTMLInputElement>(null);
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = myRefEmail!.current!.value;
        let number = myRefNumber?.current?.value;
        setResult("Searching...");

        if (!validateEmail(email)) {
          setResult("Некорректный формат email");
          return;
        }

        if (number && !validateNumber(number)) {
          setResult("Некорректный формат номера");
          return;
        }
        
        try {
          if (number) {
            number = number.replace(/-/g, "");
          }
          const result = await getUsers({email, number});
          setResult(result);
        } catch (error) {
          setResult("Произошла ошибка при получении данных. Попробуйте повторить запрос");
          console.error(error);
        }
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      myRefNumber.current!.value = inputMask(e);
  };

    return (
        <div className={styles.form}>
          <form action="submit" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email:</label>
              <input ref={myRefEmail} type="email" required />
            </div>
            <div>
              <label htmlFor="number">Number:</label>
              <input ref={myRefNumber} onInput={handleNumberChange} type="text" inputMode="numeric" />
            </div>
            <button type="submit">Submit</button>
          </form>
            <h2>Results</h2>
            {typeof result !== "string" ? (result.map((user) => <div className={styles.results}><p>Email: {user.email}</p><p>Number: {formatNumber(user.number)}</p></div>)) : (<div><p>{result}</p></div>)}
        </div>
      );
}