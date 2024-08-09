export class favorites {
  constructor(root) {
    
    this.root = document.querySelector(root)
    this.load()
  }

  load() { 
   this.entries = [
    {
      login: 'rafaaehlke',
      name: 'Rafael Ehlke',
      public_repos: '10',
      followers: '5'
  },
  {
    login: 'fronzinha',
    name: 'João Fronza',
    public_repos: '5',
    followers: '3'
  }
]

  }

}

export class favoritesView extends favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody')

    this.update()
  }

  update() {
    this.removeAllTr()

    this.entries.forEach( user => {
      const row = this.createRow()
      row.querySelector('.user img').src = `https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `Imagem de ${user.name}`
      row.querySelector('.user p' ).textContent = user.name
      row.querySelector('.user span').textContent = user.login
      row.querySelector('.repository').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers
      
      
      this.tbody.append(row)
  })

  }

  createRow() {
    // elemento criado pela dom
    const tr = document.createElement('tr')

    // conteudo do tr
    tr.innerHTML = `
       
         <!-- coluna 1 -->

        <td class="user">
          <img src="https://github.com/rafaaehlke.png" alt="foto avatar github do usuário">
          <a href="https://github.com/rafaaehlke" target="_blank">
            <p>Rafael Ehlke</p>
            <span>rafaaehlke</span>
          </a>

        </td>

         <!-- coluna 2 -->

        <td class="repository">
          10
        </td>

         <!-- coluna 3 -->

        <td class="followers">
          5
        </td>

         <!-- coluna 4 -->

        <td>
          <button class="remove">&times;</button>
        </td>
      
    `
    // retorna o conteudo do tr.inner
    return tr
  }

  removeAllTr() {
    this.tbody.querySelectorAll('tr').forEach((tr) => {
      tr.remove()
    })
    
  }
}

