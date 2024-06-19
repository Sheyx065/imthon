

document.addEventListener('DOMContentLoaded', function() {
    const blogCardsContainer = document.getElementById('blog-cards');
    
    fetch('https://blogpost-server-production-d92d.up.railway.app/api/v1/blogs')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data && data.data && Array.isArray(data.data)) {
                data.data.forEach(blog => {
                    const card = document.createElement('div');
                    card.classList.add('card');
                    card.innerHTML = `
                        <img src="${blog.image}" alt="${blog.title}">
                        <h3>${blog.title}</h3>
                        <p>${blog.description}</p>
                    `;
                    card.addEventListener('click', () => {
                        window.location.href = `./pages/product.html?id=${blog._id}`;
                    });
                    blogCardsContainer.appendChild(card);
                });
            } else {
                console.error('Data is not in the expected format:', data);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});






const carousel = document.querySelector('.carousel');
const scrollStep = 296; 
const scrollInterval = 1000; 
let autoScrollInterval;
let scrollAmount = 0;
let direction = 1;

function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        carousel.scrollBy({
            left: scrollStep * direction,
            behavior: 'smooth'
        });

        scrollAmount += scrollStep * direction;

        if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth || scrollAmount <= 0) {
            direction *= -1; 
        }
    }, scrollInterval);
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

function resetAutoScroll() {
    stopAutoScroll();
    startAutoScroll();
}

carousel.addEventListener('mouseenter', stopAutoScroll);
carousel.addEventListener('mouseleave', startAutoScroll);
carousel.addEventListener('scroll', resetAutoScroll);


startAutoScroll();

document.addEventListener('DOMContentLoaded', function() {
   
    const form = document.getElementById('create-post-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const image = document.getElementById('image').value;
            const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());

            const postData = {
                title: title,
                description: description,
                image: image,
                tags: tags
            };

            fetch('https://blogpost-server-production-d92d.up.railway.app/api/v1/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                alert('Post created successfully!');
                window.location.href = 'index.html'; 
            })
            .catch(error => {
                console.error('Error creating post:', error);
                alert('Failed to create post. Please try again.');
            });
        });
    } else {
        console.error('Form element not found');
    }


    fetch('https://blogpost-server-production-d92d.up.railway.app/api/v1/blogs')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const mainContent = document.querySelector('.main-content');

            if (mainContent && Array.isArray(data.data)) {
                data.data.forEach(blog => {
                    const blogCard = document.createElement('div');
                    blogCard.classList.add('blog-card');

                    const blogTitle = document.createElement('h2');
                    blogTitle.textContent = blog.title;
                    blogCard.appendChild(blogTitle);

                    const blogDescription = document.createElement('p');
                    blogDescription.textContent = blog.description;
                    blogCard.appendChild(blogDescription);

                    const blogImage = document.createElement('img');
                    blogImage.src = blog.image;
                    blogImage.alt = blog.title;
                    blogCard.appendChild(blogImage);

                    const blogTags = document.createElement('p');
                    blogTags.textContent = `Tags: ${blog.tags.join(', ')}`;
                    blogCard.appendChild(blogTags);

                    mainContent.appendChild(blogCard);
                });
            } else {
                console.error('No mainContent element or data is not an array');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
document.addEventListener('DOMContentLoaded', function() {
    const loginLink = document.getElementById('login-link');
    
    loginLink.addEventListener('click', function(event) {
        event.preventDefault(); 
        window.location.href = 'https://blogpost-server-production-d92d.up.railway.app/api/v1/user/login'; 
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const loginLink = document.getElementById('login-link');

    loginLink.addEventListener('click', function(event) {
        event.preventDefault();
        const loginUrl = 'https://blogpost-server-production-d92d.up.railway.app/api/v1/user/login';

    
        window.open(loginUrl, '_blank');
        
        
    });
});
