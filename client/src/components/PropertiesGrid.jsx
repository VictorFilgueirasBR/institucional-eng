// client/src/components/PropertiesGrid.jsx
import React from 'react';
import './PropertiesGrid.scss';

// Dados dos imóveis com as imagens fornecidas e informações fictícias
const propertiesData = [
  { 
    id: 1, 
    image: '/images/enhanced_1.png', 
    title: 'Residência Exclusiva', 
    location: 'Bairro Nobre, Cidade', 
    price: 'R$ 2.800.000', 
    description: 'Design moderno com amplos espaços e acabamentos de alto padrão.', 
    cta: 'Ver Detalhes' 
  },
  { 
    id: 2, 
    image: '/images/enhanced_2.png', 
    title: 'Apartamento Luxuoso', 
    location: 'Centro, Metrópole', 
    price: 'R$ 1.500.000', 
    description: 'Cobertura com vista panorâmica e área de lazer completa.', 
    cta: 'Ver Detalhes' 
  },
  { 
    id: 3, 
    image: '/images/enhanced_3.png', 
    title: 'Casa de Campo Serene', 
    location: 'Zona Rural, Interior', 
    price: 'R$ 3.200.000', 
    description: 'Ampla propriedade com jardim exuberante e piscina privativa.', 
    cta: 'Ver Detalhes' 
  },
  { 
    id: 4, 
    image: '/images/enhanced_4.png', 
    title: 'Loft Urbano Minimalista', 
    location: 'Área Central, Bairro Moderno', 
    price: 'R$ 950.000', 
    description: 'Espaço compacto e inteligente, ideal para a vida moderna.', 
    cta: 'Ver Detalhes' 
  },
  { 
    id: 5, 
    image: '/images/enhanced_5.png', 
    title: 'Vila Costeira Charmosa', 
    location: 'Praia do Sol, Litoral', 
    price: 'R$ 4.500.000', 
    description: 'Propriedade à beira-mar com acesso exclusivo e arquitetura rústica chic.', 
    cta: 'Ver Detalhes' 
  },
  { 
    id: 6, 
    image: '/images/enhanced_6.png', 
    title: 'Penthouse Exclusiva', 
    location: 'Área Nobre, Grande Cidade', 
    price: 'R$ 6.800.000', 
    description: 'Design de interiores premiado, vistas espetaculares e total privacidade.', 
    cta: 'Ver Detalhes' 
  },
  { 
    id: 7, 
    image: '/images/enhanced_7.png', 
    title: 'Fazenda Histórica', 
    location: 'Vale Verde, Campo', 
    price: 'R$ 7.100.000', 
    description: 'Grande extensão de terra, casarão colonial restaurado e vasta área verde.', 
    cta: 'Ver Detalhes' 
  },
  { 
    id: 8, 
    image: '/images/enhanced_8.png', 
    title: 'Apartamento Design', 
    location: 'Centro, Cidade Grande', 
    price: 'R$ 1.200.000', 
    description: 'Decoração contemporânea, muita luz natural e infraestrutura completa.', 
    cta: 'Ver Detalhes' 
  },
  { 
    id: 9, 
    image: '/images/enhanced_9.png', 
    title: 'Moradia Familiar', 
    location: 'Condomínio Fechado, Subúrbio', 
    price: 'R$ 1.900.000', 
    description: 'Casa espaçosa, ideal para famílias, com segurança e lazer.', 
    cta: 'Ver Detalhes' 
  },
  { 
    id: 10, 
    image: '/images/enhanced_10.png', 
    title: 'Estúdio Moderno', 
    location: 'Área Boêmia, Centro', 
    price: 'R$ 680.000', 
    description: 'Perfeito para solteiros ou casais jovens, próximo a tudo.', 
    cta: 'Ver Detalhes' 
  },
  { 
    id: 11, 
    image: '/images/enhanced_11.png', 
    title: 'Residência Campestre', 
    location: 'Montanhas, Região Serrana', 
    price: 'R$ 2.700.000', 
    description: 'Imersa na natureza, com lareira e ambientes aconchegantes.', 
    cta: 'Ver Detalhes' 
  },
  { 
    id: 12, 
    image: '/images/enhanced_12.png', 
    title: 'Casa com Piscina', 
    location: 'Bairro Residencial, Cidade', 
    price: 'R$ 1.350.000', 
    description: 'Ótima para o verão, com churrasqueira e espaço para eventos.', 
    cta: 'Ver Detalhes' 
  }
];

const PropertiesGrid = ({ title = 'Performance Digital Premium Otimizada por IA', id = 'properties-grid' }) => {
  return (
    <section className="properties-grid-section" id={id}>
      <h2 className="section-title">{title}</h2>
      <div className="properties-grid-container">
        {propertiesData.map(property => (
          <div className="property-card" key={property.id}>
            <div className="property-image-wrapper">
              <img src={property.image} alt={property.title} className="property-image" />
              <span className="property-price">{property.price}</span>
            </div>
            <div className="property-info">
              <h3 className="property-title">{property.title}</h3>
              <p className="property-location">{property.location}</p>
              <p className="property-description">{property.description}</p>
              <button className="property-cta submit-gradient-btn">{property.cta}</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertiesGrid;
