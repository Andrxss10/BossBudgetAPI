class Telefono {
    constructor(idTelefono, Numero, NombreUsuario) {
        this.idTelefono = idTelefono;
        this.Numero = Numero;
        this.NombreUsuario = NombreUsuario;
    }

    toJSON() {
        return {
            idTelefono: this.idTelefono,
            Numero: this.Numero,
            NombreUsuario: this.NombreUsuario
        };
    }
}

module.exports = Telefono;