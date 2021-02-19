import graphene
from graphene import ObjectType, String, Schema, InputObjectType, Mutation
from graphene_sqlalchemy import SQLAlchemyObjectType
from models.user_model import UserModel
from models.vendor_model import VendorModel

class User(SQLAlchemyObjectType):
  class Meta:
    model = UserModel

class Vendor(SQLAlchemyObjectType):
  class Meta:
    model = VendorModel

class Query(ObjectType):
  users = graphene.List(User)
  user = graphene.Field(User, id=graphene.Int())

  vendors = graphene.List(Vendor)
  vendor = graphene.Field(Vendor, id=graphene.Int())

  def resolve_users(root, info):
    query = User.get_query(info)  # SQLAlchemy query
    return query.all()

  def resolve_user(root, info, id):
    query = User.get_query(info)
    return query.filter(UserModel.id == id).first()

  def resolve_vendors(root, info): 
    query = Vendor.get_query(info)  # SQLAlchemy query
    return query.all()

  def resolve_vendor(root, info, id):
    query = Vendor.get_query(info)
    return query.filter(VendorModel.id == id).first()

class UpdateVendor(Mutation):
  class Arguments: 
    id = graphene.Int()
    status = graphene.Int()
    tier = graphene.String()

  vendor = graphene.Field(Vendor,
    id = graphene.Int(),
    status = graphene.Int(),
    tier = graphene.String())

  def mutate(root, info, id, status=None, tier=None):
    vendor = Vendor.objects.get(pk=id)
    vendor.status = status if status is not None else vendor.status
    vendor.tier = tier if tier is not None else vendor.tier
    vendor.save()
    return UpdateVendor(vendor=vendor)

class Mutation(ObjectType):
  updateVendor = UpdateVendor.Field()

schema = Schema(query=Query, mutation=Mutation)

