import axios from "axios";


export interface User {
    email: string,
    number?: number
}

export const getUsers = async (email?: string, number?: string): Promise<User[] | string> => {
      const response = await axios.get<User[]>('http://localhost:3000/users', {
        params: { email, number }
      });
        if(response.status === 200) {
          return response.data
        }
        else {
          return "Произошла ошибка при получении данных. Попробуйте повторить запрос"
        }
  };