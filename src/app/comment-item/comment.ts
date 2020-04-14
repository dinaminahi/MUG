export class Comment {
    text: string;
    date: string;
    user: {
        personal: {
            photoUrl: String;
            name: String;
            firstName: String;
            lastName: String;
            phone: String;
            email: String;
            location: {
              address: String;
              geo: {
                longitude: Number;
                latitude: Number;
              }
            },
            dateOfBirth: String,
            description: String;
          },
          events: [];
          games: {
            favorited: []; 
            skillLevel: [];
            rating: Number ;
          };
    };
  }