document.addEventListener('DOMContentLoaded', function() {
    const productId = new URLSearchParams(window.location.search).get('id');
    const productContent = document.getElementById('product-content');

    if (!productId) {
        productContent.innerHTML = '<p>No product ID found in the URL</p>';
        return;
    }

    fetch(`https://blogpost-server-production-d92d.up.railway.app/api/v1/blogs/${productId}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const product = data.data;

                const productTitle = document.createElement('h2');
                productTitle.textContent = product.title;
                productContent.appendChild(productTitle);

                const productImage = document.createElement('img');
                productImage.src = product.image;
                productImage.alt = product.title;
                productImage.classList.add('product-image');
                productContent.appendChild(productImage);

                const productTags = document.createElement('p');
                productTags.classList.add('product-tags');
                productTags.innerHTML = `Tags: ${product.tags.map(tag => `<a href="#">${tag}</a>`).join(', ')}`;
                productContent.appendChild(productTags);

                const productDescription = document.createElement('p');
                productDescription.textContent = product.description;
                productContent.appendChild(productDescription);
            } else {
                productContent.innerHTML = '<p>Product not found</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching product details:', error);
            productContent.innerHTML = '<p>Error fetching product details</p>';
        });
});
