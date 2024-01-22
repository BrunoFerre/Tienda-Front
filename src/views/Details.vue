<template>
    <div class="container mx-auto flex items-center justify-center">
  <div id="container">
    <div class="imgBx">
      <img
        :src="producto.image"
        :alt="producto.name"
      />
    </div>
    <div class="details flex flex-col ">
      <div class="content">
        <h2>
          {{ producto.name }}<br />
          <span>{{ producto.category }}</span>
        </h2>
        <p>
          {{producto.description}}
        </p>
        <h3 class="price">${{ producto.price }}</h3>
        <button class="buy" @click.prevent="comprar">Comprar</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  name: "Details",
  components: {Swal},
  data() {
    return {
      producto: null,
    }
  },
  created() {
    this.traerProducto();
  },
  methods: {
    traerProducto(){
        console.log(this.$route.params.id)
        let id = this.$route.params.id.replace("s:","");
        axios.get('http://localhost:9090/api/products/' + id)
        .then((response) => {
            this.producto = response.data;
        }).catch((error) => {
            console.log(error)
        })
    },
    comprar(){
      let data = ([{id:this.producto.id, quantity:1}]);
      console.log(data);
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:9090/api/buy",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer "+localStorage.getItem("token"),
        },
        maxRedirects: 0,
        data: data,
      };
      axios
        .request(config)
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Comprado! Su numero de compra es: " + response.data,
            confirmButtonText: "Ok",
          }).then(() => {
            sessionStorage.removeItem("carrito");
            this.traerCarrito();
            location.reload();
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};
</script>
<style scoped>
#container {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 900px;
    background: #fff;
    margin: 20px;
}

#container .imgBx {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    background: #212121;
    transition: .3s linear;

}


#container .imgBx img {
    transition: .9s linear;
    object-fit: contain;
}

#container .details {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
    box-sizing: border-box;
    padding: 40px;
}

#container .details h2{
    margin: 0;
    padding: 0;
    font-size: 2.4em;
    line-height: 1em;
    color: #444;
}

#container .details h2 span {
    font-size: 0.4em;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #999;
}

#container .details p {
    max-width: 85%;
    margin-left: 15%;
    color: #333;
    font-size: 15px;
    margin-bottom: 36px;
}

#container .details h3 {
    margin: 0;
    padding: 0;
    font-size: 2.5em;
    color: #a2a2a2;
    float: left;
    align-self: center;
}
#container .details button {
    background: #000;
    color: #fff;
    border: none;
    outline: none;
    padding: 15px 20px;
    margin-top: 5px;
    font-size: 16px;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-weight: 600;
    border-radius: 40px;
    float: right;
}

.product-colors span {
    width: 26px;
    height: 26px;
    top: 7px;
    margin-right: 12px;
    left: 10px;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
    display: inline-block;
}

.black {
    background: #000;
}

.red {
    background: #D5212E;
}

.orange {
    background: #F18557;
}

.product-colors .active:after{
    content: "";
    width: 36px;
    height: 36px;
    border: 2px solid #000;
    position: absolute;
    border-radius: 50%;
    box-sizing: border-box;
    left: -5px;
    top: -5px;
}

/* responsive */
@media (max-width: 1080px) {
    #container {
        height: auto;
    }
    #container .imgBx {
        padding: 40px;
        box-sizing: border-box;
        width: 100% !important;
        height: auto;
        text-align: center;
        overflow: hidden;
    }
    #container .imgBx img {
        left: initial;
        max-width: 100%;
        transform: rotate(0deg);
    }
    .details {
        width: 100% !important;
        height: auto;
        padding: 20px;
    }
    #container .details p {
        margin-left: 0;
        max-width: 100%;
    }
}

</style>