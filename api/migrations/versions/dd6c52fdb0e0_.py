"""empty message

Revision ID: dd6c52fdb0e0
Revises: 35cfa7cfab14
Create Date: 2024-09-19 14:39:26.043956

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'dd6c52fdb0e0'
down_revision = '35cfa7cfab14'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('business', 'bu_title')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('business', sa.Column('bu_title', mysql.VARCHAR(length=128), nullable=False))
    # ### end Alembic commands ###