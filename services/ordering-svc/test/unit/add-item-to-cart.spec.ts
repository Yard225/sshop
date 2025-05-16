describe('AddItemToCart', () => {
  it('ajoute un article au panier', () => {
    const cart: { id: string; name: string; qty: number }[] = [];
    const item = { id: 'p1', name: 'Produit 1', qty: 1 };
    cart.push(item);
    expect(cart).toHaveLength(1);
    expect(cart[0]).toEqual(item);
  });
}); 