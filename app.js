// 模擬 API
class API {
    constructor() {
        this.profiles = [
            { id: 1, name: '小明', age: 25, image: '2.webp', description: '喜歡運動和旅遊' },
            { id: 2, name: '小華', age: 28, image: '3.webp', description: '愛好音樂和美食' },
            { id: 3, name: '小芳', age: 23, image: '1.webp', description: '熱愛閱讀和寫作' },
        ];
    }

    async getProfiles() {
        // 模擬 API 延遲
        await new Promise(resolve => setTimeout(resolve, 500));
        return this.profiles;
    }
}

// Model
class ProfileModel {
    constructor() {
        this.api = new API();
        this.profiles = [];
        this.currentIndex = 0;
    }

    async loadProfiles() {
        this.profiles = await this.api.getProfiles();
    }

    getCurrentProfile() {
        return this.profiles[this.currentIndex];
    }

    nextProfile() {
        this.currentIndex = (this.currentIndex + 1) % this.profiles.length;
    }
}

// View
class ProfileView {
    constructor() {
        this.profileCard = document.getElementById('profile-card');
        this.likeButton = document.getElementById('like');
        this.dislikeButton = document.getElementById('dislike');
    }

    render(profile) {
        if (profile) {
            this.profileCard.innerHTML = `
                <img src="${profile.image}" alt="${profile.name}" class="profile-image">
                <h2>${profile.name}, ${profile.age}</h2>
                <p>${profile.description}</p>
            `;
            this.addImageClickEffect();
        } else {
            this.profileCard.innerHTML = '<p>載入中...</p>';
        }
    }

    addImageClickEffect() {
        const profileImage = this.profileCard.querySelector('.profile-image');
        profileImage.addEventListener('click', function () {
            this.style.filter = 'grayscale(100%)';
            setTimeout(() => {
                this.style.filter = 'none';
            }, 1000);
        });
    }

    bindLike(handler) {
        this.likeButton.addEventListener('click', handler);
    }

    bindDislike(handler) {
        this.dislikeButton.addEventListener('click', handler);
    }
}

// Controller
class ProfileController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.bindLike(this.handleLike.bind(this));
        this.view.bindDislike(this.handleDislike.bind(this));

        this.init();
    }

    async init() {
        this.view.render(null); // 顯示載入中
        await this.model.loadProfiles();
        this.updateView();
    }

    updateView() {
        const currentProfile = this.model.getCurrentProfile();
        this.view.render(currentProfile);
    }

    handleLike() {
        console.log('喜歡');
        this.model.nextProfile();
        this.updateView();
    }

    handleDislike() {
        console.log('不喜歡');
        this.model.nextProfile();
        this.updateView();
    }
}

// 初始化應用
const app = new ProfileController(new ProfileModel(), new ProfileView());

function addSlideInEffect() {
    const slideInElements = document.querySelectorAll('.slide-in');

    function checkSlide() {
        slideInElements.forEach(element => {
            const slideInAt = (window.scrollY + window.innerHeight) - element.offsetHeight / 2;
            const elementBottom = element.offsetTop + element.offsetHeight;
            const isHalfShown = slideInAt > element.offsetTop;
            const isNotScrolledPast = window.scrollY < elementBottom;

            if (isHalfShown && isNotScrolledPast) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', checkSlide);
    window.addEventListener('load', checkSlide);
}

addSlideInEffect();

document.addEventListener('DOMContentLoaded', function () {
    const image = document.getElementById('myImage');

    image.addEventListener('click', function () {
        this.style.filter = 'grayscale(100%)';
        setTimeout(() => {
            this.style.filter = 'none';
        }, 1000);
    });
});