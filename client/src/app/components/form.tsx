import { useRef, useState } from "react";
import { User, getUsers } from "../helpers/getUsers";


export function Form() {
    const [result, setResult] = useState<User[] | string>("Введите запрос" as string);
    const myRefEmail = useRef<HTMLInputElement>(null);
    const myRefNumber = useRef<HTMLInputElement>(null);
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = myRefEmail?.current?.value;
        const number = myRefNumber?.current?.value;
        setResult("Searching...");
        try {
          const result = await getUsers(email, number);
          setResult(result);
        } catch (error) {
          setResult("Произошла ошибка при получении данных. Попробуйте повторить запрос");
          console.error(error);
        }
    };

    return (
        <div>
          <form action="submit" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email:</label>
              <input ref={myRefEmail} type="email" required />
            </div>
            <div>
              <label htmlFor="number">Number:</label>
              <input ref={myRefNumber} type="text" inputMode="numeric" />
            </div>
            <button type="submit">Submit</button>
          </form>
            <h2>Results</h2>
            {typeof result !== "string" ? (result.map((user) => <><p>{user.email}</p><p>{user.number}</p></>)) : (<div><p>{result}</p></div>)}
        </div>
      );
}