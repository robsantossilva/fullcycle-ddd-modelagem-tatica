# DDD: Modelagem Tática e Patterns

## Entities

Um dos principais elementos da modelagem tática e que precisa ser compreendida da forma correta.

_“Uma entidade é algo único que é capaz de ser alterado de forma contínua durante um longo período de tempo”_ Vernon, Vaughn. Implementing DDD

_“Uma entidade é algo que possui uma continuidade em seu ciclo de vida e pode ser distinguida independente dos atributos que são importantes para a aplicação do usuário. Pode ser uma pessoa, cidade, carro,um tocket de loteria ou uma transação bancária” Evans, Eric. DDD (p. 91)_

Entidade = IDENTIDADE


- Entidades possuem regras de negócios
- Entidade sempre irá representar o **estado correto** e atual do elemento (**Consistência**)
- Entidades inconsistentes não conseguem validar **regras de negócio**
- Não existe confiança em entidades inconsistentes
- Uma entidade tem sempre a responsabilidade de se **auto validar**
- Entidade de Domínio é focada em negócio, para a persistência é necessário definir outro elemento/classe. 

## Value Objects

## Aggregates

## Domain Service
"Um **Serviço de Domínio** é uma operação sem estado que cumpre uma tarefa específica do dominio. 
Muitas vezes, a melhor indicação de que você deve criar um Serviço no modelo de domínio é quando a operação que você precisa executar parece não se encaixar como um método em um Agregado ou um Objeto de Valor."
Vernon, Vaughn. Implemening DDD.

- Uma entidade pode realizar uma ação que vai afetar todas as/uma entidade(s)?
- Como realizar uma operação em lote?
- Como calcular algo cuja as informações constam em mais de uma entidade?

#### Cuidados
- Quando houver muitos Domain Services em seu projeto, TALVEZ, isso pode indicar que seus agregados estão anémicos.
- Domain Services são Stateless


## Repositories
Um repositório comumente se refere a um local de armazenamento, geralmente considerado um local de segurança ou preservação dos itens nele armazenados.
Quando você armazena algo em um repositório de depois retorna para recuperá-lo, você espera que ele esteja no mesmo estado que estava quando você o colocou lá. Em algum momento, você pode optar por remover o item armazenado do repositório.
Vernon, Vaughn. Implementing DDD

Esses objetos semelhantes a coleções são sobre persistências. Todo tipo Agregado persistente terá um Repositório. De um modo geral, existe uma relação um-para-um entre tipo Agregado e um Repositório.
Vernon, Vaughn. Implementing DDD
