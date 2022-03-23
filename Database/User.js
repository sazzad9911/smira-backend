class User{
    constructor()

    setUser(name, email, image, verified) {
        this.name = name;
        this.email = email;
        this.image = image;
        this.verified = verified;
    }
    
    getUser() {
        return{
            name:this.name,
            email:this.email,
            image:this.image,
            verified:this.verified
        }
    }
}

module.exports=User