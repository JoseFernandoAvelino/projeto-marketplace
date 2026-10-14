import bcrypt

from app.db import executar

senha = bcrypt.hashpw(b"123456", bcrypt.gensalt()).decode()

executar(
    "INSERT INTO usuarios (nome, cpf, email, senha) VALUES (%s, %s, %s, %s), (%s, %s, %s, %s)",
    (
        "Conta de Teste", "52998224725", "teste@app.com", senha,   
        "Maria Vendedora", "11144477735", "maria@app.com", senha,   
    ),
)

produtos = [
    (2, "Smartphone Pro Max", "Aparelho com 128GB, bateria ótima.", "celulares", 2450, "Ótimo estado",
     "Centro, Surubim - PE", "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80"),
    (2, "Cadeira Ergonômica", "Com apoio lombar e regulagem de altura.", "moveis", 680, "Usado",
     "Caruaru - PE", "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80"),
    (1, "Headphone ANC Bluetooth", "Cancelamento de ruído, 30h de bateria.", "celulares", 390, "Novo",
     "Centro, Surubim - PE", "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&q=80"),
    (2, "Bike Aro 29 Alumínio", "Quadro de alumínio, 21 marchas.", "esportes", 1550, "Ótimo estado",
     "Surubim - PE", "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80"),
]
for vendedor, titulo, descricao, categoria, preco, condicao, local, imagem in produtos:
    executar(
        """INSERT INTO produtos (vendedor_id, titulo, descricao, categoria, preco, condicao, localizacao, imagens)
           VALUES (%s, %s, %s, %s, %s, %s, %s, %s)""",
        (vendedor, titulo, descricao, categoria, preco, condicao, local, [imagem]),
    )

executar("INSERT INTO conversas (produto_id, comprador_id, vendedor_id) VALUES (1, 1, 2)")
executar("INSERT INTO mensagens (conversa_id, remetente_id, texto) VALUES (1, 1, 'Boa tarde, este produto está disponível?')")
executar("INSERT INTO mensagens (conversa_id, remetente_id, texto) VALUES (1, 2, 'Boa tarde! Sim, está disponível.')")

print("Dados de exemplo inseridos.")
print("Logins (senha 123456): teste@app.com (id 1) e maria@app.com (id 2)")