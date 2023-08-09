export async function CheckRegistered(email: string){

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/user/checkRegistered`,
        {method: 'POST', body: JSON.stringify({email})}
    )

    const data = await response.json();

    return data.status

}

export async function Register(email: string, password: string, name: string, surname: string, birthday: string){

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/register`,
        {method: 'POST', body: JSON.stringify({email, password, name, surname, birthday})}
    )

    return await response.json()

}

export async function Login(email: string, password: string){

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/login`,
        {method: 'POST', body: JSON.stringify({email, password})}
    )

    return await response.json()

}

export async function CheckAuth(token: string){

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_IP}/admin/user`,
        {method: 'GET', headers: {Authorization: `Bearer ${token}`}}
    )

    return response.ok

}