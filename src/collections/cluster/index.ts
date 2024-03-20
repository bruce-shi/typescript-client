import { NodesStatusGetter } from '../../cluster/index.js';
import Connection from '../../connection/index.js';
import { BatchStats, NodeStats, NodeShardStatus } from '../../openapi/types.js';

type Output = 'minimal' | 'verbose';

export type NodesOptions<O extends Output> = {
  /** The name of the collection to get the status of. */
  collection?: string;
  /** Set the desired output verbosity level. Can be `minimal | verbose`. */
  output?: O;
};

export type Node<O extends Output> = {
  name: string;
  status: 'HEALTHY' | 'UNHEALTHY' | 'UNAVAILABLE';
  version: string;
  gitHash: string;
  stats: O extends 'minimal' ? undefined : Required<NodeStats>;
  batchStats: Required<BatchStats>;
  shards: O extends 'minimal' ? null : Required<NodeShardStatus>[];
};

const cluster = (connection: Connection) => {
  return {
    nodes: <O extends Output = 'minimal'>(opts?: NodesOptions<O>): Promise<Node<O>[]> => {
      let builder = new NodesStatusGetter(connection).withOutput(opts?.output ? opts.output : 'minimal');
      if (opts?.collection) {
        builder = builder.withClassName(opts.collection);
      }
      return builder.do().then((res) => res.nodes) as Promise<Node<O>[]>;
    },
  };
};

export default cluster;

export interface Cluster {
  /**
   * Get the status of all nodes in the cluster.
   *
   * @param {NodesOptions<O>} [opts] The options for the request.
   * @returns {Promise<Node<O>[]>} The status of all nodes in the cluster.
   */
  nodes: <O extends Output = 'minimal'>(opts?: NodesOptions<O>) => Promise<Node<O>[]>;
}
