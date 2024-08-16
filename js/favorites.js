import { GithubUser } from "./githubUser.js"

export class favorites {
  constructor(root) {

    this.root = document.querySelector(root)
    this.load()
    
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
    
  }

  save() {
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
  }

 async add(username) {
    try {

      const userExists = this.entries.find(entry => entry.login === username)

      if(userExists) {
        throw new Error('Usuário já cadastrado!')
      }

      const user = await GithubUser.search(username)

      if(user.login === undefined) {
        throw new Error('Usuário não encontrado')
      }

      this.entries = [user, ...this.entries]
      this.update()
      this.save()

    } catch(error)  {
      alert(error.message)
    }
 }

  delete(user) {
    // Higher-order functions (map, filter, find, reduce)
    const filteredEntries = this.entries.filter(entry => entry.login !== user.login)

    this.entries = filteredEntries
    this.update()
    this.save()
  }

}

export class favoritesView extends favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody')

    this.update()
    this.onadd()
  }

  onadd() {
    const addButton = this.root.querySelector('.search button')
    addButton.onclick = () => {
      const { value } = this.root.querySelector('.search input')
      
        this.add(value)
    }

  }

  update() {
    this.removeAllTr()

    this.entries.forEach(user => {
      const row = this.createRow()

      row.querySelector('.user img').src = `https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `Imagem de ${user.name}`
      row.querySelector('.user p').textContent = user.name
      row.querySelector('.user span').textContent = user.login
      row.querySelector('.repository').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers

      row.querySelector('.remove').onclick = () => {
        const isOk = confirm('Gostaria de remover este usuário?')
       
        if (isOk) {
          this.delete(user)
        }
      }
      
      this.tbody.append(row)
    })

  }

  createRow() {
    // elemento criado pela dom
    const tr = document.createElement("tr")

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

