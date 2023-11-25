import axios from "axios";


export interface User {
    email: string,
    number: number
}

interface Iprops {
  email: string
  number?: string
}

export const getUsers = async (props: Iprops): Promise<User[] | string> => {
      const { email, number } = props
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