function login(){

let user =
document.getElementById("username").value;


let pass =
document.getElementById("password").value;



if(user=="sistem informasi" && pass=="2025"){

alert("Login Berhasil");


window.location="dashboard.html";


}

else{


document.getElementById("pesan").innerHTML=
"Username atau Password Salah";


}

}
// Data awal sistem kasir

if(localStorage.getItem("produk")==null){

localStorage.setItem("produk",JSON.stringify([]));

}



if(localStorage.getItem("transaksi")==null){

localStorage.setItem("transaksi",JSON.stringify([]));

}

// ===========================
// SHIFT AKTIF
// ===========================

if(localStorage.getItem("shiftAktif")==null){

    localStorage.setItem("shiftAktif",JSON.stringify(null));

}



// Menampilkan data dashboard

if(document.getElementById("jumlahProduk")){


let produk =
JSON.parse(localStorage.getItem("produk"));



let transaksi =
JSON.parse(localStorage.getItem("transaksi"));



document.getElementById("jumlahProduk").innerHTML =
produk.length;



document.getElementById("jumlahTransaksi").innerHTML =
transaksi.length;



let total=0;


transaksi.forEach(function(data){

total += data.total;

});



document.getElementById("omset").innerHTML =
total.toLocaleString();

}
// =================
// DATA PRODUK
// =================


function tambahProduk(){


let nama =
document.getElementById("namaProduk").value;


let harga =
Number(document.getElementById("hargaProduk").value);


let stok =
Number(document.getElementById("stokProduk").value);



if(nama=="" || harga=="" || stok==""){

alert("Data belum lengkap");

return;

}



let produk =
JSON.parse(localStorage.getItem("produk"));



produk.push({

nama:nama,

harga:harga,

stok:stok


});



localStorage.setItem(
"produk",
JSON.stringify(produk)
);



alert("Produk berhasil ditambahkan");



tampilkanProduk();


}




function tampilkanProduk(){


let tabel =
document.getElementById("tabelProduk");



if(tabel){


let produk =
JSON.parse(localStorage.getItem("produk"));



tabel.innerHTML="";



produk.forEach(function(item,index){



tabel.innerHTML += `

<tr>

<td>${index+1}</td>

<td>${item.nama}</td>

<td>
Rp ${item.harga.toLocaleString()}
</td>

<td>${item.stok}</td>


<td>

<button onclick="hapusProduk(${index})">
Hapus
</button>


</td>


</tr>

`;



});


}


}





function hapusProduk(index){


let produk =
JSON.parse(localStorage.getItem("produk"));



produk.splice(index,1);



localStorage.setItem(
"produk",
JSON.stringify(produk)
);



tampilkanProduk();


}




// Jalankan otomatis saat halaman produk dibuka

tampilkanProduk();
// ========================
// SISTEM KASIR
// ========================


let keranjang = [];




// Menampilkan produk ke pilihan kasir

function tampilkanPilihanProduk(){


let pilih =
document.getElementById("pilihProduk");



if(pilih){


let produk =
JSON.parse(localStorage.getItem("produk"));



pilih.innerHTML="";



produk.forEach(function(item,index){


pilih.innerHTML += `

<option value="${index}">

${item.nama} - Rp ${item.harga}

</option>


`;


});


}


}





function tambahKeranjang(){



let index =
document.getElementById("pilihProduk").value;



let jumlah =
Number(document.getElementById("jumlahBeli").value);



let produk =
JSON.parse(localStorage.getItem("produk"));



let item = produk[index];



keranjang.push({

nama:item.nama,

harga:item.harga,

jumlah:jumlah,

total:item.harga * jumlah


});



tampilkanKeranjang();


}




function tampilkanKeranjang(){


let tabel =
document.getElementById("keranjang");



if(tabel){


tabel.innerHTML="";



let total=0;



keranjang.forEach(function(item){



total += item.total;



tabel.innerHTML += `


<tr>

<td>${item.nama}</td>

<td>
Rp ${item.harga.toLocaleString()}
</td>


<td>${item.jumlah}</td>


<td>
Rp ${item.total.toLocaleString()}
</td>


</tr>


`;



});



document.getElementById("totalHarga").innerHTML =
total.toLocaleString();



}


}




function hitungTotal(){


let total =
Number(document.getElementById("totalHarga").innerText.replace(/\./g,""));



let diskon =
Number(document.getElementById("diskon").value);



let bayar =
Number(document.getElementById("bayar").value);



let hargaAkhir =
total - (total * diskon /100);



document.getElementById("kembalian").innerHTML =

(bayar-hargaAkhir).toLocaleString();



}



function simpanTransaksi(){

    let pelanggan =
    document.getElementById("namaPelanggan").value;

    if(pelanggan==""){

        alert("Silakan masukkan nama pelanggan.");

        return;

    }

    let total =
    Number(document.getElementById("totalHarga").innerText.replace(/\./g,""));

    let diskon =
    Number(document.getElementById("diskon").value);

    let hargaAkhir =
    total - (total * diskon / 100);

    let transaksi =
    JSON.parse(localStorage.getItem("transaksi"));

    transaksi.push({

        tanggal:new Date().toLocaleString(),

        pelanggan:pelanggan,

        barang:keranjang,

        total:hargaAkhir

    });

    localStorage.setItem(
        "transaksi",
        JSON.stringify(transaksi)
    );

    alert("Transaksi berhasil disimpan");

    keranjang=[];

    document.getElementById("namaPelanggan").value="";
    document.getElementById("jumlahBeli").value="";
    document.getElementById("diskon").value=0;
    document.getElementById("bayar").value="";

    tampilkanKeranjang();

}




function cetakStruk(){

    let pelanggan =
    document.getElementById("namaPelanggan").value;

    let struk="========== STRUK ==========\n\n";

    struk += "Pelanggan : "+pelanggan+"\n";

    struk += "Tanggal : "+new Date().toLocaleString()+"\n";

    struk += "--------------------------\n";

    keranjang.forEach(function(item){

        struk +=
        item.nama+
        " x "+
        item.jumlah+
        " = Rp "+
        item.total.toLocaleString()+
        "\n";

    });

    struk += "--------------------------\n";

    struk +=
    "TOTAL : Rp "+
    document.getElementById("totalHarga").innerText;

    alert(struk);

}




tampilkanPilihanProduk();
// ===============================
// ABSENSI KARYAWAN
// ===============================

if(localStorage.getItem("absensi")==null){

    localStorage.setItem("absensi",JSON.stringify([]));

}

function absen(){

    let nama=document.getElementById("namaKaryawan").value;
    let jabatan=document.getElementById("jabatan").value;
    let status=document.getElementById("status").value;

    if(nama==""){

        alert("Nama karyawan harus diisi");

        return;

    }

    let data=JSON.parse(localStorage.getItem("absensi"));

    let sekarang=new Date();

    let tanggal=sekarang.toLocaleDateString();

    let jam=sekarang.toLocaleTimeString();

    data.push({

        nama:nama,

        jabatan:jabatan,

        tanggal:tanggal,

        jam:jam,

        status:status

    });

    localStorage.setItem("absensi",JSON.stringify(data));

    alert("Absensi berhasil disimpan");

    document.getElementById("namaKaryawan").value="";

    tampilkanAbsensi();

}

function tampilkanAbsensi(){

    let tabel=document.getElementById("tabelAbsensi");

    if(!tabel) return;

    let data=JSON.parse(localStorage.getItem("absensi"));

    tabel.innerHTML="";

    data.forEach(function(item,index){

        tabel.innerHTML+=`

        <tr>

        <td>${index+1}</td>

        <td>${item.nama}</td>

        <td>${item.jabatan}</td>

        <td>${item.tanggal}</td>

        <td>${item.jam}</td>

        <td>${item.status}</td>

        </tr>

        `;

    });

}

// ===============================
// RESET ABSENSI
// ===============================

function resetAbsensi(){

    let yakin=confirm("Apakah Anda yakin ingin menghapus seluruh riwayat absensi?");

    if(yakin){

        localStorage.removeItem("absensi");

        localStorage.setItem("absensi",JSON.stringify([]));

        tampilkanAbsensi();

        alert("Riwayat absensi berhasil direset.");

    }

}

tampilkanAbsensi();
// ========================
// LAPORAN PENJUALAN
// ========================


function tampilkanLaporan(){


let tabel =

document.getElementById("tabelLaporan");



if(tabel){


let transaksi =

JSON.parse(localStorage.getItem("transaksi"));



tabel.innerHTML="";



let totalUang=0;

let jumlahBarang=0;



transaksi.forEach(function(item,index){



totalUang += item.total;



item.barang.forEach(function(b){

jumlahBarang += b.jumlah;

});




tabel.innerHTML += `
<tr>

<td>${index+1}</td>

<td>${item.tanggal}</td>

<td>${item.pelanggan}</td>

<td>
Rp ${item.total.toLocaleString()}
</td>

</tr>
`;



});





document.getElementById("totalTransaksi").innerHTML =

transaksi.length;



document.getElementById("barangTerjual").innerHTML =

jumlahBarang;



document.getElementById("totalPendapatan").innerHTML =

totalUang.toLocaleString();



}


}





tampilkanLaporan();
// ========================
// RESET OMSET
// ========================


function resetOmset(){


let yakin = confirm(
"Apakah Anda yakin ingin menghapus semua data omset?"
);



if(yakin){


localStorage.removeItem("transaksi");



alert(
"Omset berhasil direset"
);



location.reload();


}


}

// ========================
// CETAK LAPORAN
// ========================

function cetakLaporan(){

    window.print();

}

//========================================
// SETTLEMENT KASIR
//========================================

if(localStorage.getItem("settlement")==null){

localStorage.setItem("settlement",JSON.stringify([]));

}

let shift={};

function bukaShift(){

    let kasir = document.getElementById("kasir").value;
    let modal = Number(document.getElementById("modal").value);

    if(kasir==""){

        alert("Nama kasir belum diisi");

        return;

    }

    let shift = {

        kasir:kasir,

        modal:modal,

        tanggal:new Date().toLocaleDateString(),

        jamMasuk:new Date().toLocaleTimeString(),

        status:"AKTIF"

    };

    localStorage.setItem("shiftAktif",JSON.stringify(shift));

    tampilkanShiftAktif();

    alert("Shift berhasil dibuka");

}

function tampilkanShiftAktif(){

    let shift = JSON.parse(localStorage.getItem("shiftAktif"));

    if(!shift) return;

    if(document.getElementById("namaKasir")){

        document.getElementById("namaKasir").innerHTML = shift.kasir;

        document.getElementById("jamMasuk").innerHTML = shift.jamMasuk;

        document.getElementById("modalAwal").innerHTML = shift.modal.toLocaleString();

    }

}



function hitungSettlement(){

let shift = JSON.parse(localStorage.getItem("shiftAktif"));

if(!shift){

    alert("Belum ada shift yang dibuka");

    return;

}
let transaksi=

JSON.parse(localStorage.getItem("transaksi"));

let total=0;

transaksi.forEach(function(item){

total+=item.total;

});

document.getElementById("omsetSettlement").innerHTML=

total.toLocaleString();

let kasAktual=

Number(document.getElementById("kasAktual").value);

let seharusnya = shift.modal + total;

let selisih=

kasAktual-seharusnya;

document.getElementById("selisih").innerHTML=

selisih.toLocaleString();

}



function tutupShift(){

    let shift = JSON.parse(localStorage.getItem("shiftAktif"));

    if(!shift){

        alert("Belum ada shift yang aktif.");

        return;

    }

    let transaksi = JSON.parse(localStorage.getItem("transaksi"));

    let totalOmset = 0;

    transaksi.forEach(function(item){

        totalOmset += item.total;

    });

    let kasAktual = Number(document.getElementById("kasAktual").value);

    let seharusnya = shift.modal + totalOmset;

    let selisih = kasAktual - seharusnya;

    let settlement = JSON.parse(localStorage.getItem("settlement"));

    settlement.push({

        kasir:shift.kasir,
        tanggal:shift.tanggal,
        jamMasuk:shift.jamMasuk,
        jamKeluar:new Date().toLocaleTimeString(),
        modal:shift.modal,
        omset:totalOmset,
        kasAktual:kasAktual,
        selisih:selisih

    });

    localStorage.setItem("settlement",JSON.stringify(settlement));

    // Hapus shift aktif
    localStorage.setItem("shiftAktif",JSON.stringify(null));

    // Kosongkan transaksi agar shift berikutnya dimulai dari nol
    localStorage.setItem("transaksi",JSON.stringify([]));

    // ==========================
    // RESET TAMPILAN
    // ==========================

    document.getElementById("namaKasir").innerHTML="-";
    document.getElementById("jamMasuk").innerHTML="-";
    document.getElementById("jamKeluar").innerHTML="-";
    document.getElementById("modalAwal").innerHTML="0";
    document.getElementById("omsetSettlement").innerHTML="0";
    document.getElementById("selisih").innerHTML="0";

    document.getElementById("kasir").value="";
    document.getElementById("modal").value="";
    document.getElementById("kasAktual").value="";

    alert("Shift berhasil ditutup.");

    tampilkanSettlement();
    resetFormSettlement();

}

function resetFormSettlement(){

    document.getElementById("kasir").value="";
    document.getElementById("modal").value="";

    document.getElementById("namaKasir").innerHTML="-";
    document.getElementById("jamMasuk").innerHTML="-";
    document.getElementById("jamKeluar").innerHTML="-";
    document.getElementById("modalAwal").innerHTML="0";
    document.getElementById("omsetSettlement").innerHTML="0";
    document.getElementById("selisih").innerHTML="0";
    document.getElementById("kasAktual").value="";

}



function tampilkanSettlement(){

let tabel=document.getElementById("tabelSettlement");

if(!tabel) return;

let data=

JSON.parse(localStorage.getItem("settlement"));

tabel.innerHTML="";

data.forEach(function(item,index){

tabel.innerHTML+=`

<tr>

<td>${index+1}</td>

<td>${item.kasir}</td>

<td>${item.tanggal}</td>

<td>Rp ${item.omset.toLocaleString()}</td>

<td>Rp ${item.selisih.toLocaleString()}</td>

</tr>

`;

});

}



function resetSettlement(){

if(confirm("Hapus seluruh riwayat settlement?")){

localStorage.removeItem("settlement");

localStorage.setItem("settlement",JSON.stringify([]));

tampilkanSettlement();

alert("Riwayat settlement berhasil dihapus");

}

}

tampilkanSettlement();
tampilkanShiftAktif();

// ======================================
// SETTLEMENT MASUK KE LAPORAN
// ======================================

function tampilkanSettlementLaporan(){

    let tabel = document.getElementById("tabelSettlementLaporan");

    if(!tabel) return;

    let data = JSON.parse(
        localStorage.getItem("settlement")
    ) || [];

    tabel.innerHTML = "";

    data.forEach(function(item,index){

        let warnaSelisih = "";

        if(item.selisih < 0){

            warnaSelisih = "style='color:red;font-weight:bold'";

        }

        else if(item.selisih > 0){

            warnaSelisih = "style='color:green;font-weight:bold'";

        }

        tabel.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${item.tanggal}</td>

            <td>${item.kasir}</td>

            <td>${item.jamMasuk}</td>

            <td>${item.jamKeluar}</td>

            <td>
                Rp ${Number(item.modal).toLocaleString()}
            </td>

            <td>
                Rp ${Number(item.omset).toLocaleString()}
            </td>

            <td>
                Rp ${Number(item.kasAktual).toLocaleString()}
            </td>

            <td ${warnaSelisih}>
                Rp ${Number(item.selisih).toLocaleString()}
            </td>

        </tr>

        `;

    });

}

tampilkanSettlementLaporan();
