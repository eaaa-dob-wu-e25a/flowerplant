export default function Footer() {
    return (
        <footer className="footer">
            <div>
                <div>FlowerPlant</div>
                <div>123 Botanical Lane, Green City, 2345 Copenhagen, Denmark</div>
                <div>Email: flowplant123@flowerplant2026.dk</div>
                <div>Mobile: +452076765</div>
             </div>
              <div>© {new Date().getFullYear()} FlowerPlant</div>
        </footer>
    );
}
