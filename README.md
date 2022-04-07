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

## Domain Events
"Use um evento de domínio para capturar uma ocorrência de algo que aconteceu no domínio."
Vernon Vaughn. Implementing DDD

"A essência de um evento de domínio é que você o usa para capturar coisas que podem desencadear uma mudança no estado do aplicativo que você está desenvolvendo. Esses objetos de eventos são processados para causar alterações no sistema e armazenados para fornecer um AuditLog."
Fowler, Martin. Domain Event

Todo evento deve ser representado em uma ação realizada no passado:
- UserCreated
- OrderPlaced
- EmailSent

Quando utilizar
Normalmente um Domain Event deve ser utilizado quando queremos notificar outros Bounded Contexts de uma mudança de estado.

#### Componentes
- Event
- Handler: Executa o processamento quando um evento é chamado
- Event Dispatcher: Responsável por armazenar e executar os handlers de um evento quando ele for disparado

#### Dinâmica
- Criar um "Event Dispatcher"
- Criar um "Evento"
- Criar um "Handler" para o "Evento"
- Registrar o Evento, juntamente com o Handler no "Event DIspatcher"

Agora para disparar um evento, basta executar o método "notify" do "Event Dispatcher". Nesse momento todos os Handlers registrados no evento serão executados.

___

## Módulos
Em um contexto DDD, módulos em seu modelo serverm como **containeres** nomeados para classes de objetos de dominio que são altamente coesos entre si.
O objetivo deve ser baixo acoplamento entre as classes que estão em módulos diferentes.
Como os Módulos usados no DDD não são compartimentos de armazenamento anêmicos ou genéricos, também é importante nomear adequadamente os Módulos.
Vernon, Vaughn

- Módulos devem respeitar a linguagem Universal/Ubiqua
- Baixo acoplamento
- Um ou mais agregados devem estar juntos somente se fiser sentido
- Organizaçao pelo domínio/subdomínio e não pelo tipo de objetos
- Devem respeitar a mesma divisão quando estão em camadas diferentes

## Factories
Desloque a responsabilidade de criar instancias de objetos complexos e AGREGADOS para um objeto separado, que pode não ter responsabilidade no modelo de dominio, mas ainda faz parte do design do dominio.
Forneça uma interface que encapsula toda a criação complexa e que não exija que o cliente faça referencia às classes concretas dos objetos que estão sendo instanciados.
Crie AGGREGATES inteiros de uma única vez, reforçando suas invariantes.
Evans, Eric. DDD

**Client** ---new(params)---> **FACTORY** ---create---> **product**
**Client** <---product--- **FACTORY**

# Dicas finais
- Pense no coração do software
- Deixe para depois as complexidades acidentais (Banco de Dados, Cache, Email, Framework, API/CMD, GRPC)
- Sempre comece pelo dominio/Regras de Negócio
- Evite criar entidades e agregados anemicos
- Não misture entidades do ORM com entidades de dominio
- 