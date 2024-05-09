function Footer() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 bg-gray-100 px-32 py-14 border-t text-gray-600">
      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">A PROPOS</h5>
        <p>Comment fonctionne airbnb</p>
        <p>Nouveautés</p>
        <p>Investisseurs</p>
        <p>Airbnb Plus</p>
        <p>Airbnb Luxe</p>
      </div>

      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">COMMUNAUTÉE</h5>
        <p>Accessibilitée</p>
        <p>Rejoignez la communaité airbnb</p>
        <p>Partager vos avis</p>
      </div>

      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">BESOIN D&apos;AIDE</h5>
        <p>Centre d&apos;appel</p>
        <p>Sécurité</p>
        <p>Conditions générales</p>
      </div>
    </div>
  );
}

export default Footer;
