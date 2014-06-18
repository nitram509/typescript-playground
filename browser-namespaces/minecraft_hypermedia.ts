module minecraft {

  export module hypermedia {

    interface RelationType {
      href: string;
      title: string;
    }

    export class HyperMediaDocument<DataType, EmbeddedType> {

      private data: any;
      private links: { [relationName: string]: RelationType; } = {};
      private embedded: any;

      constructor(data: any) {
        if (!data) return;
        if (data._links) {
          this.links = data._links;
          delete data._links;
        }
        if (data._embedded) {
          this.embedded = data._embedded;
          delete data._embedded;
        }
        this.data = data;
      }

      getData(): DataType {
        return this.data;
      }

      getEmbedded(): EmbeddedType {
        return this.embedded;
      }

      getSelfLink(): string {
        return this.getLink("self");
      }

      getLink(relation: string): string {
        if (this.links[relation]) {
          return this.links[relation].href;
        }
        return null;
      }
    }

  }

}