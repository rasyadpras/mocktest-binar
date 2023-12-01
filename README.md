# Mock Test Binar Academy

### Question

1. Apakah Kegunaan JSON pada REST API?
```
JSON (javascript object notation) pada REST API berguna sebagai format pengiriman dan penerimaan data
yang lebih mudah untuk diuraikan dan diakses datanya dibandingkan dengan XML.
(Sumber: reading material)
```

2. Jelaskan bagaimana REST API bekerja!
```
RESTful API berperan sebagai jembatan antara database dengan user (client).
Cara kerjanya yaitu pertama user (client) akan membuat request ke server untuk mengakses atau memanipulasi data,
kemudian request tersebut akan dikirim ke server dengan menyertakan endpoint.
Selanjutnya server akan menerima request dan memproses request tersebut kemudian menghasilkan response berupa data yang diminta oleh user (client).
Setelah itu, server akan memberikan response tersebut kepada user (client).
(Sumber: reading material, mtarget.co/blog/apa-itu-rest-api/)
```

### Link Deploy Railway
```
https://mocktest-binar-production.up.railway.app/
```

### Documentation
You can access the API documentation with endpoint `` `http://localhost:8000/docs ```

### Instalation Guide
1. Clone the repository
2. Go to the project directory
3. Install the dependencies using ```npm install```
4. Start the server using ```npm run dev```

### Environment Setting
Create file ```.env``` in the directory and add the following environment variables to your ```.env``` file :
- ```PORT=8000```
- ``` DATABASE_URL="postgresql://{your_username}:{your_password}@localhost:5432/{your_database_name}?schema=public"``` :
- ```SECRET_KEY=yoursecretkeynumber```
