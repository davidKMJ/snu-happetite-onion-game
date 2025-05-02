interface Image {
    name: string;
    image: any;
}

export class OnionImages {
    static images: Array<Image> = [
        {
            name: 'onion0',
            image: require('../assets/onion0.png')
        },
        {
            name: 'onion1',
            image: require('../assets/onion1.png')
        },
        {
            name: 'onion2',
            image: require('../assets/onion2.png')
        },
        {
            name: 'onion3',
            image: require('../assets/onion3.png')
        },
        {
            name: 'onion4',
            image: require('../assets/onion4.png')
        },
        {
            name: 'onion5',
            image: require('../assets/onion5.png')
        }
    ];

    static GetImage = (name: string) => {
        const found = OnionImages.images.find(e => e.name === name);
        return found ? found.image : null;
    };

}