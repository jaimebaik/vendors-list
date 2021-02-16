import graphene
from graphene import ObjectType, String, Schema
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

  def resolve_users(root, info):
    query = User.get_query(info)  # SQLAlchemy query
    return query.all()

  def resolve_user(root, info, id):
    query = User.get_query(info)
    return query.filter(UserModel.id == id).first()

  def resolve_vendors(root, info): 
    query = Vendor.get_query(info)  # SQLAlchemy query
    return query.all()
  
schema = Schema(query=Query)

