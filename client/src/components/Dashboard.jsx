import React, { useState } from 'react';

// O componente Dashboard que contém toda a lógica e UI para a criação de anúncios.
export default function Dashboard() {
  // Estados para armazenar os valores do formulário e o arquivo de mídia
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null); // Estado para o arquivo de mídia
  const [category, setCategory] = useState('produto');
  const [statusMessage, setStatusMessage] = useState('');

  // Lógica para lidar com o drag and drop
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Lógica para lidar com a seleção de arquivo via clique
  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados do anúncio para um serviço de backend
    console.log({ productName, description, price, file, category });
    setStatusMessage('Anúncio criado com sucesso!');
    
    // Limpar os campos do formulário após o envio
    setProductName('');
    setDescription('');
    setPrice('');
    setFile(null);
    setCategory('produto');
  };

  // Função para lidar com o efeito spotlight no botão
  const handleMouseMove = (e) => {
    const { currentTarget, clientX, clientY } = e;
    const rect = currentTarget.getBoundingClientRect();
    currentTarget.style.setProperty('--x', `${clientX - rect.left}px`);
    currentTarget.style.setProperty('--y', `${clientY - rect.top}px`);
  };

  return (
    // Contêiner principal da página com fundo escuro
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <style>
        {`
        // Estilos customizados para o scrollbar
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #1f2937;
        }
        ::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
        `}
      </style>
      
      {/* Título e descrição do dashboard */}
      <div className="text-center mb-10 mt-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
          Dashboard de Anúncios
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto">
          Crie e gerencie seus anúncios de produtos e serviços com facilidade.
        </p>
      </div>

      {/* Cartão principal do dashboard */}
      <div className="w-full max-w-3xl bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 md:p-12">
        
        {/* Formulário de criação de anúncio */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Título do formulário */}
          <h2 className="text-2xl font-bold text-gray-200">Criar Novo Anúncio</h2>

          {/* Campo: Nome do Produto/Serviço */}
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-400 mb-2">
              Nome do Produto/Serviço
            </label>
            <input
              type="text"
              id="productName"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Ex: Consultoria de Marketing"
              required
            />
          </div>

          {/* Campo: Descrição */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-2">
              Descrição
            </label>
            <textarea
              id="description"
              rows="4"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva seu produto ou serviço em detalhes..."
              required
            ></textarea>
          </div>

          {/* Campo: Preço */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-400 mb-2">
              Preço (R$)
            </label>
            <input
              type="number"
              id="price"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ex: 150.00"
              step="0.01"
              required
            />
          </div>

          {/* Campo de Upload de Mídia com Drag and Drop */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Mídia do Anúncio
            </label>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById('file-upload').click()}
              className="mt-1 flex justify-center items-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md cursor-pointer hover:border-blue-500 transition-colors duration-200"
            >
              <div className="space-y-1 text-center">
                {!file ? (
                  <>
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      {/* Apenas um único atributo 'd' é usado agora para a forma do ícone */}
                      <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m-4-4l-1.625 1.625 M15 19l4.5 4.5 9-9" fill="none"></path>
                    </svg>
                    <div className="flex text-sm text-gray-400">
                      <span className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-blue-400 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-800 focus-within:ring-blue-500">
                        <span>Carregar um arquivo</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileSelect} />
                      </span>
                      <p className="pl-1">ou arraste e solte</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF até 10MB</p>
                  </>
                ) : (
                  <div className="text-center">
                    {/* Exibe a pré-visualização do arquivo */}
                    <img src={URL.createObjectURL(file)} alt="Pré-visualização do arquivo" className="mx-auto max-h-40 rounded-md mb-2" />
                    <p className="text-sm font-medium text-gray-300">Arquivo selecionado: {file.name}</p>
                    <button type="button" onClick={() => setFile(null)} className="mt-2 text-sm text-red-400 hover:text-red-500">
                      Remover
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Campo: Categoria */}
          <div className="flex items-center space-x-6">
            <span className="text-sm font-medium text-gray-400">Categoria:</span>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="category"
                value="produto"
                checked={category === 'produto'}
                onChange={(e) => setCategory(e.target.value)}
                className="form-radio text-blue-500 h-4 w-4"
              />
              <span className="ml-2 text-gray-300">Produto</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="category"
                value="servico"
                checked={category === 'servico'}
                onChange={(e) => setCategory(e.target.value)}
                className="form-radio text-blue-500 h-4 w-4"
              />
              <span className="ml-2 text-gray-300">Serviço</span>
            </label>
          </div>

          {/* Botão de envio */}
          <div className="w-full flex justify-center">
  <button
    type="submit"
    className="submit-gradient-btn"
    onMouseMove={handleMouseMove}
    style={{ minWidth: "320px", padding: "0.8rem", fontSize: "1rem" }}
  >
    Criar Anúncio
  </button>
</div>
          
          {/* Mensagem de status */}
          {statusMessage && (
            <div className="mt-4 text-center text-green-400 font-medium">
              {statusMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
