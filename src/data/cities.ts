interface District {
  name: string;
  center?: boolean;
}

interface City {
  name: string;
  districts: District[];
}

export const turkishCities: City[] = [
  {
    name: 'İstanbul',
    districts: [
      { name: 'Adalar' },
      { name: 'Arnavutköy' },
      { name: 'Ataşehir' },
      { name: 'Avcılar' },
      { name: 'Bağcılar' },
      { name: 'Bahçelievler' },
      { name: 'Bakırköy' },
      { name: 'Başakşehir' },
      { name: 'Bayrampaşa' },
      { name: 'Beşiktaş' },
      { name: 'Beykoz' },
      { name: 'Beylikdüzü' },
      { name: 'Beyoğlu' },
      { name: 'Büyükçekmece' },
      { name: 'Çatalca' },
      { name: 'Çekmeköy' },
      { name: 'Esenler' },
      { name: 'Esenyurt' },
      { name: 'Eyüp' },
      { name: 'Fatih', center: true },
      { name: 'Gaziosmanpaşa' },
      { name: 'Güngören' },
      { name: 'Kadıköy' },
      { name: 'Kağıthane' },
      { name: 'Kartal' },
      { name: 'Küçükçekmece' },
      { name: 'Maltepe' },
      { name: 'Pendik' },
      { name: 'Sancaktepe' },
      { name: 'Sarıyer' },
      { name: 'Silivri' },
      { name: 'Sultanbeyli' },
      { name: 'Sultangazi' },
      { name: 'Şile' },
      { name: 'Şişli' },
      { name: 'Tuzla' },
      { name: 'Ümraniye' },
      { name: 'Üsküdar' },
      { name: 'Zeytinburnu' }
    ]
  },
  {
    name: 'Ankara',
    districts: [
      { name: 'Akyurt' },
      { name: 'Altındağ' },
      { name: 'Ayaş' },
      { name: 'Bala' },
      { name: 'Beypazarı' },
      { name: 'Çamlıdere' },
      { name: 'Çankaya', center: true },
      { name: 'Çubuk' },
      { name: 'Elmadağ' },
      { name: 'Etimesgut' },
      { name: 'Evren' },
      { name: 'Gölbaşı' },
      { name: 'Güdül' },
      { name: 'Haymana' },
      { name: 'Kalecik' },
      { name: 'Kahramankazan' },
      { name: 'Keçiören' },
      { name: 'Kızılcahamam' },
      { name: 'Mamak' },
      { name: 'Nallıhan' },
      { name: 'Polatlı' },
      { name: 'Pursaklar' },
      { name: 'Sincan' },
      { name: 'Şereflikoçhisar' },
      { name: 'Yenimahalle' }
    ]
  },
  {
    name: 'İzmir',
    districts: [
      { name: 'Aliağa' },
      { name: 'Balçova' },
      { name: 'Bayındır' },
      { name: 'Bayraklı' },
      { name: 'Bergama' },
      { name: 'Beydağ' },
      { name: 'Bornova' },
      { name: 'Buca' },
      { name: 'Çeşme' },
      { name: 'Çiğli' },
      { name: 'Dikili' },
      { name: 'Foça' },
      { name: 'Gaziemir' },
      { name: 'Güzelbahçe' },
      { name: 'Karabağlar' },
      { name: 'Karaburun' },
      { name: 'Karşıyaka' },
      { name: 'Kemalpaşa' },
      { name: 'Kınık' },
      { name: 'Kiraz' },
      { name: 'Konak', center: true },
      { name: 'Menderes' },
      { name: 'Menemen' },
      { name: 'Narlıdere' },
      { name: 'Ödemiş' },
      { name: 'Seferihisar' },
      { name: 'Selçuk' },
      { name: 'Tire' },
      { name: 'Torbalı' },
      { name: 'Urla' }
    ]
  }
  // Diğer şehirler ve ilçeleri buraya eklenebilir
]; 