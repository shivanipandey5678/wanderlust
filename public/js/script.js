(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


  
   // search functionality
   let searchBox= document.querySelector(".serch-inp");
   let btnSearch = document.querySelector(".btn-search");
 
   btnSearch.addEventListener("click", (event) => {
       event.preventDefault(); 
 
       let searchValue = searchBox.value.trim(); 
 
       if (searchValue) {
           
           let queryParam = encodeURIComponent(searchValue); 
           window.location.href = `/listings?category=${queryParam}`; 
       } else {
           alert(" Click on search input and Please select a category from the dropdown!"); // Handle empty input
       }
 });


 



