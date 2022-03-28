# DDD: Modelagem Tática e Patterns

**Entities**

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
