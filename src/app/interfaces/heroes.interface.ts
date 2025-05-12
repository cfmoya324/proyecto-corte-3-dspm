export interface heroe{
    nombre: string;
    bio: string;
    img: string;
    aparicion: string;
    casa: string;
    _id: string;
};

export interface heroesApi{
    Ok: boolean;
    total: number;
    resp: Array<heroe>;
}

export interface insertarApi{
    Ok: boolean;
    msg: string;
    resp?: {
        message?: string;
    };
}

export interface editarApi{
    Ok: boolean;
    msg: string;
    resp?: {
        message?: string;
    };
}

export interface borrarApi{
    Ok: boolean;
    msg: string;
    resp?: {
        message?: string;
    };
}
