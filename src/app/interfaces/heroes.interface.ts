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



export interface multimedia{
    _id: string;
    url: string;
    tipo?: string;
    estado: boolean;
    IdGrupoMultimedia: {
        _id: string;
        nombre: string;
    };
    usuario: {
        _id: string;
        nombre: string;
    };
    fecha_creacion: string;
    fecha_actualizacion: string;
};

export interface multimediaApi{
    Ok: boolean;
    total: number;
    resp: Array<multimedia>;
}



export interface grupo{
    _id: string;
    nombre: string;
    usuario: {
        _id: string;
        nombre: string;
    };
    fecha_creacion: string;
    fecha_actualizacion: string;
};

export interface grupoApi{
    Ok: boolean;
    total: number;
    resp: Array<grupo>;
}



export interface multimediaHeroe{
    _id: string;
    IdMultimedia: {
        _id: string;
        url: string;
    };
    IdHeroe: {
        _id: string;
        nombre: string;
    };
};

export interface multimediaHeroeApi{
    Ok: boolean;
    resp: Array<multimediaHeroe>;
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
