import React, { Component } from 'react'
import './style/sAboutUs.css'

class CAboutUs extends Component {
  render () {
    return (
      <div className='about-us'>
        <div className='container pt-5'>
          <div className='row justify-content-center'>
            <div className='col-md-8'>
              <h4 className='text-center'>TENTANG KAMI</h4>
              <br />
              <div className='container text-center mb-5'>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='row-title'>
                      <b>Tripdize menawarkan cara yang praktis</b>
                    </div>
                    <div className='row-subtitle'>
                      <p>
                                                Agar anda bisa menemukan beragam aktivitas,
                                                atraksi dan kegiatan lainnya saat berlibur ke mana punMasih ragu ?
                                                Coba berlangganan terlebih dahulu sebelum melakukan order.
                                                Kami memastikan anda tidak akan kecewa dengan layanan yang diberikan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h4 className='text-center'>MISI KAMI</h4>
              <br />
              <div className='containe text-center mb-5'>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='row-title'>
                      <b>
                                                Permudah diri anda untuk menikmati segala hal yang
                                                ditawarkan di destinasi.
                      </b>
                    </div>
                    <div className='row-subtitle'>
                      <p>
                                                Sudah seharusnya traveling itu menjadi momen untuk
                                                bersenang-senang tanpa harus terbeban dengan banyak PR
                                                perencanaan. Dengan begitu banyak aktivitas
                                                yang menunggu untuk ditemukan, kami ingin menjembatani
                                                traveler dengan berbagai kegiatan yang mereka inginkan.
                                                Tim ahli Klook di seluruh dunia membuka dan mengumpulkan
                                                pengalaman terbaik setiap hari. Tetapi jangan hanya
                                                percaya kata kami untuk itu, dengan lebih dari jutaan
                                                ulasan pengguna, Anda selalu bisa mendapatkan penilaian
                                                asli mengenai aktivitas yang tersedia di Klook
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h4 className='text-center'>JANJI KAMI</h4>
              <br />
              <div className='container text-center mb-5'>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='row-title'>
                      <b>Garansi Harga Termurah</b>
                    </div>
                    <div className='row-subtitle'>
                      <p>
                                                Sebagai mitra resmi atraksi dan operator terkemuka
                                                di seluruh dunia, kami memastikan bahwa semua produk
                                                kami merupakan pengalaman yang berkualitas dan memiliki
                                                harga yang terbaik. Jika anda menemukan tawaran lain
                                                yang lebih murah, kami akan mengembalikan selisihnya!
                                                Pelajari lebih lanjut di sini.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default CAboutUs
