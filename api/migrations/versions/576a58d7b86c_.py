"""empty message

Revision ID: 576a58d7b86c
Revises: 69c410302d42
Create Date: 2024-11-26 12:31:01.759994

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '576a58d7b86c'
down_revision = '69c410302d42'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('business', sa.Column('t_uid', sa.String(length=128), nullable=True))
    op.create_foreign_key(None, 'business', 'teller', ['t_uid'], ['t_uid'])
    op.drop_column('business', 'bu_mobile')
    op.drop_column('business', 'bu_email')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('business', sa.Column('bu_email', mysql.VARCHAR(length=128), nullable=False))
    op.add_column('business', sa.Column('bu_mobile', mysql.VARCHAR(length=128), nullable=False))
    op.drop_constraint(None, 'business', type_='foreignkey')
    op.drop_column('business', 't_uid')
    # ### end Alembic commands ###