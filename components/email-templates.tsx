export const EmailTemplates = {
  welcome: {
    id: "welcome",
    name: "Boas-vindas",
    subject: "Bem-vinda à MF Store Girls! ✨",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #F5E6D3;">
        <div style="background: #8B6F47; padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Bem-vinda à MF Store Girls!</h1>
        </div>
        <div style="padding: 40px 20px; background: white; margin: 20px;">
          <h2 style="color: #8B6F47;">Olá {{customerName}}! 👋</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Que alegria ter você conosco! Você acabou de se juntar a milhares de mulheres que confiam na MF Store Girls para arrasar no visual.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Como boas-vindas, preparamos um desconto especial de <strong>15% OFF</strong> na sua primeira compra!
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <div style="background: #D4A574; padding: 15px; border-radius: 8px; display: inline-block;">
              <span style="font-size: 24px; font-weight: bold; color: white;">BEMVINDA15</span>
            </div>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{siteUrl}}/produtos" style="background: #8B6F47; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Começar a Comprar
            </a>
          </div>
          <p style="font-size: 14px; color: #666; text-align: center;">
            Cupom válido por 7 dias. Não acumulativo com outras promoções.
          </p>
        </div>
      </div>
    `,
    variables: ["customerName", "siteUrl"],
  },

  cartAbandoned: {
    id: "cart_abandoned",
    name: "Carrinho Abandonado",
    subject: "Você esqueceu algo especial! 🛍️",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #F5E6D3;">
        <div style="background: #8B6F47; padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Não deixe escapar!</h1>
        </div>
        <div style="padding: 40px 20px; background: white; margin: 20px;">
          <h2 style="color: #8B6F47;">Oi {{customerName}}! 💕</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Vi que você estava dando uma olhadinha em alguns produtos incríveis, mas não finalizou a compra. Que tal dar uma segunda chance para eles?
          </p>
          <div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin: 20px 0;">
            {{cartItems}}
          </div>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            E olha só que surpresa: <strong>10% OFF</strong> se você finalizar agora!
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <div style="background: #D4A574; padding: 15px; border-radius: 8px; display: inline-block;">
              <span style="font-size: 20px; font-weight: bold; color: white;">VOLTA10</span>
            </div>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{cartUrl}}" style="background: #8B6F47; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Finalizar Compra
            </a>
          </div>
          <p style="font-size: 14px; color: #666; text-align: center;">
            Oferta válida por 24 horas. Corre que é por tempo limitado! ⏰
          </p>
        </div>
      </div>
    `,
    variables: ["customerName", "cartItems", "cartUrl"],
  },

  orderConfirmation: {
    id: "order_confirmation",
    name: "Confirmação de Pedido",
    subject: "Pedido confirmado! Prepare-se para arrasar ✨",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #F5E6D3;">
        <div style="background: #8B6F47; padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Pedido Confirmado! 🎉</h1>
        </div>
        <div style="padding: 40px 20px; background: white; margin: 20px;">
          <h2 style="color: #8B6F47;">Oba, {{customerName}}!</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Seu pedido <strong>#{{orderId}}</strong> foi confirmado com sucesso! 
          </p>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #8B6F47; margin-top: 0;">Resumo do Pedido:</h3>
            {{orderItems}}
            <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;">
            <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 18px;">
              <span>Total:</span>
              <span>{{orderTotal}}</span>
            </div>
          </div>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            📦 Você receberá o código de rastreamento assim que o pedido for despachado.<br>
            💳 Pagamento processado com sucesso.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{orderUrl}}" style="background: #8B6F47; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Acompanhar Pedido
            </a>
          </div>
        </div>
      </div>
    `,
    variables: ["customerName", "orderId", "orderItems", "orderTotal", "orderUrl"],
  },

  restock: {
    id: "restock",
    name: "Produto em Estoque",
    subject: "Voltou! O produto que você queria está disponível 🔥",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #F5E6D3;">
        <div style="background: #8B6F47; padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Voltou! 🔥</h1>
        </div>
        <div style="padding: 40px 20px; background: white; margin: 20px;">
          <h2 style="color: #8B6F47;">{{customerName}}, corre! 🏃‍♀️</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            O produto que você estava esperando voltou ao estoque! Mas não demora muito para esgotar novamente...
          </p>
          <div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
            <img src="{{productImage}}" alt="{{productName}}" style="max-width: 200px; border-radius: 8px;">
            <h3 style="color: #8B6F47; margin: 15px 0;">{{productName}}</h3>
            <p style="font-size: 20px; font-weight: bold; color: #D4A574;">{{productPrice}}</p>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{productUrl}}" style="background: #8B6F47; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Comprar Agora
            </a>
          </div>
          <p style="font-size: 14px; color: #666; text-align: center;">
            ⚡ Estoque limitado! Não perca essa oportunidade novamente.
          </p>
        </div>
      </div>
    `,
    variables: ["customerName", "productName", "productImage", "productPrice", "productUrl"],
  },
}
