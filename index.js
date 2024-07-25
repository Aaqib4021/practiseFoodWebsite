class App{
    constructor(){
        this.$addToCart = document.querySelectorAll('.cart-button');
        this.$cart = document.querySelector('.cart-after-adding');
        this.unorderdList = document.createElement('ul');
        this.unorderdList.classList.add('main-list');
        this.$cart.appendChild(this.unorderdList);
        this.clickedButtons = [];
        this.$grandTotal = document.querySelector('.total-amount');
        this.$confirmButton =  document.querySelector('.confirm-button');
        this.$popupContainer = document.querySelector('.pop-up-container');
        this.$cartCount  = document.querySelector('.cart-count');
       
     
        this.addEventListeners()
    }

    addEventListeners(){

        this.$addToCart.forEach( button => {
            button.dataset.value = 1;
            this.orghtml = button.innerHTML;
            button.addEventListener('click', () => {
                this.handleCartButtonClick(button);
            })
        });
        this.$confirmButton.addEventListener('click',()=>{
            this.handlePopUp();
        })        

    }


    handleCartButtonClick(button)
    {   
        this.ChangeCartButton(button);
        this.addingItemsToCart(button);
        this.addFunctionalityTCartButtons(button);
        this.clearCartItem(button); 
        this.cartCountTop()
    }

    //?Methods
    ChangeCartButton(button){
        this.value = Number(button.dataset.value);

        this.image = button.previousElementSibling;
        this.image.style.border = '3px solid #c73a0f'
        button.style.backgroundColor= ' #c73a0f';
        
        button.innerHTML =
        `

        <button class='cart-minus'>&minus;</button>
        <input class='cart-input' type='text'/ value=${this.value}>
        <button class='cart-plus'>&plus;</button>
      
        `;
        
    }

    addingItemsToCart(button){
        this.cartBefore = document.querySelector('.cart-before-adding');
        this.confirmButton = document.querySelector('.confirm-button');
        this.totalPara = document.querySelector('.grand-total')
        this.cartBefore.style.display = 'none';
        this.confirmButton.style.display = 'block';
        this.totalPara.style.display = 'block';


        const parentNearby = button.parentElement;
        this.detailedName = parentNearby.querySelector('.detailed-name');
        // console.log(this.detailedName);
        this.itemRateElement = parentNearby.querySelector('.rate');
        // console.log(this.itemRateElement);   
        this.rateInnerText = this.itemRateElement.innerText;
            //console.log(this.rateInnerText);
        this.Rate = this.rateInnerText.split("$");
            //console.log(this.Rate[1]);
        this.finalRate = parseFloat(this.Rate[1])

        if(!this.clickedButtons.includes(button))
        {
            // console.log(this.clickedButtons);
            // console.log('not there');
            this.cartItem = document.createElement('li');
            this.cartItem.classList.add('item-name')
            this.cartItem.textContent = this.detailedName.innerText;
    
            this.detaisParagraph = document.createElement('p');
            this.detaisParagraph.classList.add('cart-item-details');
    
            this.span1 = document.createElement('span')
            this.span1.classList.add('number-of-items')
            this.span1.textContent = `${this.value}x`;
    
            this.span2 = document.createElement('span')
            this.span2.classList.add('item-rate');
            this.span2.textContent = `@${this.finalRate.toFixed(2)}`;
    
            this.span3 = document.createElement('span')
            this.span3.classList.add('item-total');
            this.itemTotal = this.finalRate * this.value
            this.span3.textContent = `$${this.itemTotal.toFixed(2)}`
    
            this.clearButton = document.createElement('button');
            this.clearButton.classList.add('clear-cart-item');
            this.clearButton.innerHTML = '&times;'
    
            this.detaisParagraph.append(this.span1,this.span2,this.span3,this.clearButton);
            
            this.cartItem.appendChild(this.detaisParagraph);
    
    
            this.unorderdList.appendChild(this.cartItem);
            button.cartItem = this.cartItem;
            button.cartItemDetails = { span1: this.span1, span3: this.span3, finalRate: this.finalRate };

        }
        else
        {

        const details = button.cartItemDetails;
        this.span1 = details.span1;
        this.span3 = details.span3;

        this.span1.textContent = `${this.value}x`;

        this.itemTotal = details.finalRate * this.value;
        this.span3.textContent = `$${this.itemTotal.toFixed(2)}`;
            
        } 
        this.clickedButtons.push(button);
    }
    cartCountTop(){
        this.$numberOfItems = document.querySelectorAll('.number-of-items');
        this.totalCount=0;
        this.$numberOfItems.forEach(item => {

            this.$itemCount = item.innerText;
            console.log(this.$itemCount);
            this.$numberpart = this.$itemCount.split('x');
            console.log(  this.$numberpart );
            this.count = Number(this.$numberpart[0]);
            console.log(this.count);
            this.totalCount += this.count;
            console.log(this.totalCount);
        });
        this.$cartCount.innerText=`${this.totalCount}`

    }
    addFunctionalityTCartButtons(button){
        this.$cartMinusButton = button.querySelector('.cart-minus');
        this.$cartPlusButton = button.querySelector('.cart-plus');
        this.$cartInputValue = button.querySelector('.cart-input');
        // console.log(this.$cartInputValue);


        this.$cartMinusButton.addEventListener('click',()=>{
            // console.log('minus clicked');
            this.getInputValue('minus',button   );    
        });

        this.$cartPlusButton.addEventListener('click',()=>{
            // console.log('plus clicked');
            this.getInputValue('plus',button)
        });

    }

    getInputValue(str,button){
        let temp = Number(button.dataset.value);
        if(str === 'minus'){
            if(this.value > 0){
                // console.log('inside minus');
                // this.value -= 1;
                // this.$cartInputValue.value = this.value;
                temp -=1;
                button.dataset.value = temp;

            }
        }
        else if(str === 'plus')
        {
            // console.log('inside plus');
            // this.value += 1;
            // this.$cartInputValue.value = this.value;
            temp += 1;
            button.dataset.value = temp;
        }
        // if(this.value === 0){
        //     console.log(this.cartItem);
        //     this.cartItem.remove()
        // } 
        

        
        
    }
    calculateGrandTotal(){
        this.alltotals = document.querySelectorAll('.item-total');
        // console.log(this.alltotals);
        if(this.alltotals.length ===    0){
            this.$grandTotal.innerText = `$00.00`;
            window.location.reload()
        }
        this.totalNum = parseFloat(0);
        this.alltotals.forEach(item =>{
            // console.log(item);
            this.totalsinnerText = item.innerText
            // console.log(this.totalsinnerText);
            this.totalsnumPart = this.totalsinnerText.split('$');
            // console.log(this.totalsnumPart[1]);
            this.totalNum += Number(this.totalsnumPart[1]);
            // console.log(this.totalNum);
            //  console.log(typeof this.totalNum); 
            this.$grandTotal.innerText =`$${this.totalNum.toFixed(2)}`

        })
    }
    clearCartItem(button){
        const clearGrandParent = this.clearButton.parentElement.parentElement;
        // console.log(clearGrandParent);
        this.clearButton.addEventListener('click',()=>{
            clearGrandParent.remove()
            this.calculateGrandTotal();
            button.innerHTML = this.orghtml;
            button.style.backgroundColor = 'white';
            this.image = button.previousElementSibling;
            this.image.style.border = 'none'
            
        })
        this.calculateGrandTotal();
    }
   
    handlePopUp(){
        this.confirmButton.style.display = 'none';
        this.cartBefore.style.display = 'block';
        this.$popupContainer.showModal();
        this.$popupContainer.append(this.unorderdList);
        this.$popupTotal = document.querySelector('.grand-total');
        this.$clearButton = document.querySelectorAll('.clear-cart-item');
        this.$clearButton.forEach(currentButton =>{
            
            currentButton.style.display='none'
        });
        this.$popupContainer.append(this.$popupTotal);
        this.$closePopup = document.createElement('button');
        this.$closePopup.classList.add('close-popUp');
        this.$closePopup.innerText = 'Close'
        this.$popupContainer.append(this.$closePopup);

        this.$closePopup.addEventListener('click',()=>{
            this.$popupContainer.close();
            window.location.reload();
        });
         this.$cartCount.innerText=`0`

        
        
    }
   
}
new App()