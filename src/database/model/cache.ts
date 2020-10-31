import mongoose from 'mongoose';
import { constants } from '../../utils';

const { config } = constants;

// An interface that describe properties
// required to create a cache
interface CacheAttrs {
  key: string;
  ttl: string;
  data?: {
    team: string;
    country: string;
  };
}

// An interface that describes the properties
// a cache Model has
interface CacheModel extends mongoose.Model<CacheDoc> {
  build(attrs: CacheAttrs): CacheDoc;
}

//  An interface that describes properties
//  on a saved Cache document
interface CacheDoc extends mongoose.Document {
  key: string;
  ttl: string;
  data?: {
    team: string;
    country: string;
  };
  isExceededTTL(): Promise<boolean>;
}

const cacheSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      require: true,
    },
    data: {
      team: {
        type: String,
      },
      country: {
        type: String,
      },
    },
    ttl: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

cacheSchema.pre('save', async function () {
  const itms = await Cache.find().sort({ created_at: -1 });
  if (itms.length + 1 > config.MAX_CACHE_ITEMS) {
    await Cache.findOneAndDelete({});
  }
});

cacheSchema.statics.build = (attrs: CacheAttrs) => {
  return new Cache(attrs);
};
cacheSchema.methods.isExceededTTL = async function () {
  const createdTime = new Date(this.createdAt).getTime();
  const now = new Date().getTime();
  const diff = now - createdTime;
  const lifeSpanSeconds = Math.floor(diff / 1000);
  const ttlDiff = now - new Date(this.ttl).getTime();
  const ttlSeconds = Math.floor(ttlDiff / 1000);
  lifeSpanSeconds > ttlSeconds;
};
const Cache = mongoose.model<CacheDoc, CacheModel>('Cache', cacheSchema);

export { Cache };
