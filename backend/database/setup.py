from .__init__ import Base, engine


Base.metadata.create_all(bind=engine)
print("Database tables created")